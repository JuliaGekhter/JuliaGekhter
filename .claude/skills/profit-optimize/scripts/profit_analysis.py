#!/usr/bin/env python3
"""Profit analysis for the Shape The Wave catalog (src/data/constants.js).

Run from dose-calculator/:  python3 ../.claude/skills/profit-optimize/scripts/profit_analysis.py

Reports profit per item ranked, top-10 concentration, dead SKUs, and
margin violations against DEFAULT_INPUTS.targetMargin.
"""
import re
import sys

CONSTANTS = 'src/data/constants.js'


def load():
    try:
        with open(CONSTANTS) as f:
            return f.read()
    except FileNotFoundError:
        sys.exit(f"Run from dose-calculator/ — {CONSTANTS} not found")


def section_items(src, section, cost_key='cost'):
    """Return {name: (cost, price)} for a DEFAULT_* array."""
    start = src.find(f'DEFAULT_{section}')
    if start < 0:
        return {}
    chunk = src[start:src.find('];', start)]
    pattern = rf"name: '([^']+)'.*?{cost_key}: (\d+).*?price: (\d+)"
    return {m.group(1): (int(m.group(2)), int(m.group(3)))
            for m in re.finditer(pattern, chunk, re.DOTALL)}


def main():
    src = load()

    target_m = re.search(r'targetMargin: ([\d.]+)', src)
    target = float(target_m.group(1)) if target_m else 0.60

    catalog = {}
    for section, ck in [('MEMBERSHIPS', 'totalCost'), ('BUNDLES', 'cost'), ('PACKAGES', 'cost')]:
        for name, cp in section_items(src, section, ck).items():
            catalog[name] = (*cp, section)

    sales_chunk = src[src.find('DEFAULT_SALES'):]
    sales = {m.group(1): (int(m.group(2)), int(m.group(3)))
             for m in re.finditer(r"name: '([^']+)', unitsSold: (\d+), price: (\d+)", sales_chunk)}

    rows, missing, violations = [], [], []
    for name, (units, price) in sales.items():
        if name not in catalog:
            missing.append(name)
            continue
        cost, _, section = catalog[name]
        margin = (price - cost) / price if price else 0
        if margin < target:
            violations.append((name, margin))
        rows.append((name, section, units, price, units * (price - cost), margin))

    rows.sort(key=lambda r: r[4], reverse=True)
    total = sum(r[4] for r in rows) or 1
    top10 = sum(r[4] for r in rows[:10])

    print(f"CATALOG: {len(catalog)} SKUs | SOLD: {len(rows)} | TARGET MARGIN: {target:.0%}")
    print(f"TOTAL MONTHLY PROFIT: ${total:,}")
    print(f"TOP-10 CONCENTRATION: ${top10:,} = {top10 / total:.0%} of profit\n")

    print("RANKED PROFIT (top 15):")
    for name, sec, units, price, profit, margin in rows[:15]:
        print(f"  ${profit:>8,} | {units:>3} × ${price:>5,} | {margin:.0%} | {name} ({sec[:3]})")

    dead = [n for n in catalog if n not in sales]
    print(f"\nDEAD SKUs (no sales): {len(dead)}")
    for n in dead:
        print(f"  - {n} ({catalog[n][2][:3]})")

    print(f"\nMARGIN VIOLATIONS (< {target:.0%}): {len(violations)}")
    for n, m in violations:
        print(f"  - {n}: {m:.1%}")
    if missing:
        print(f"\nSALES REFERENCING MISSING CATALOG ITEMS: {missing}")

    print("\nOK" if not (violations or missing) else "\nACTION NEEDED")


if __name__ == '__main__':
    main()
