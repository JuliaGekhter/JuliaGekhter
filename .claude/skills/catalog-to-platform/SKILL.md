---
name: catalog-to-platform
description: End-to-end workflow for turning a pricing spreadsheet into a shippable business platform - extract prices, model the catalog (Memberships vs Bundles vs Packages vs Services), optimize for profit, update the dashboard, generate documents, and ship. Use for major catalog overhauls, new price sheets, or "put it all together" requests.
---

# Catalog → Platform (End-to-End)

The master workflow. Each phase can invoke its dedicated skill.

## Phase 1: Extract pricing (if a spreadsheet is provided)
- `pip install openpyxl`; load with `data_only=True`
- Iterate with `values_only=True` (plain `iter_rows` crashes on MergedCell — no `.column_letter`)
- Shape The Wave sheet conventions: use the **"Rounded 2025 Self Pay"** column for patient prices; "NEW PRICE DISCOUNT OTHER INSURANCE / WITH BCBS" for insurance tiers; "OUR COST" columns for costs; 3-month / 6-month columns for package pricing; the Athena sheet holds CPT codes with a 25% fee increase column

## Phase 2: Model the catalog — the four concepts are SEPARATE
This distinction is locked (the user corrected it explicitly):
- **Services** = individual a la carte items `{ name, category, cost, price, priceInsurance, priceBcbs }` — list everything; costs nothing to offer
- **Bundles** = product groupings sold together (meds, creams, shakes) `{ name, category, cost, price, items[] }` — NOT connected to memberships
- **Packages** = multi-month service programs (treatments + visits + labs over time) `{ name, category, cost, price, duration, services[] }`
- **Memberships** = recurring monthly plans `{ name, tier, starterFee, totalCost, maxCost, price, credits, referralBonus, services[], products[] }` — credits + included services + product discounts

All data lives in `dose-calculator/src/data/constants.js`. Components render whatever the data contains — catalog edits need no component changes.

## Phase 3: Optimize for profit
Invoke the **profit-optimize** skill: measure profit per item, cut dead SKUs and cannibalizing tiers, shift volume into the ladders, verify total profit ≥ baseline and every margin ≥ target (60%). Membership cost = *incremental* delivery cost, not retail value of perks.

## Phase 4: Update the dashboard
Invoke the **add-dashboard-tab** skill for new feature areas. For data-only changes, edit constants.js and update any tests in `App.test.js` that reference renamed/cut item names.

## Phase 5: Verify (hard gates)
- `./node_modules/.bin/react-scripts test --watchAll=false` — all pass
- `./node_modules/.bin/react-scripts build` — "Compiled successfully", zero warnings
- Re-run `.claude/skills/profit-optimize/scripts/profit_analysis.py` — no dead SKUs, no margin violations

## Phase 6: Document
Invoke the **generate-stw-docs** skill: regenerate both Word docs from the new data, commit, send via SendUserFile.

## Phase 7: Ship
- Clean temp files first (`generate_doc.py`, screenshots) — the git stop hook flags anything untracked
- Commit with the profit/SKU delta in the message; push with `git push -u origin claude/financial-dashboard-nnDd3`
- GitHub API is unavailable in this environment (`gh` gets 403) — give the user the compare URL: `https://github.com/JuliaGekhter/JuliaGekhter/compare/main...<branch>`
- To show the result: dev server on port 3000 + playwright screenshots (`executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`, install `playwright` npm package locally; the CLI alone can't click tabs)
