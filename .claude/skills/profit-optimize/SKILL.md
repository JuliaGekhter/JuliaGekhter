---
name: profit-optimize
description: Analyze a product/service catalog for profit concentration, then simplify it — cut dead SKUs, consolidate cannibalizing tiers, and shift volume into top performers while keeping every item above the target margin. Use when asked to "optimize", "simplify", "find the most profit", or prune a pricing catalog. Works on the dose-calculator dashboard data (src/data/constants.js) or any catalog with cost/price/units data.
---

# Profit Optimize — Simplify a Catalog Around Its Profit Core

## When to use
- The user asks to optimize margins, maximize profit, simplify the offering, or prepare a menu "to scale"
- A catalog has grown large (many SKUs) and nobody knows what actually makes money
- Margins are inconsistent across memberships/bundles/packages/services

## Method (in order)

### 1. Measure — never cut before measuring
Run `scripts/profit_analysis.py` from `dose-calculator/` (or adapt the regexes to the data source). It reports:
- **Profit per item** = unitsSold × (price − cost), ranked
- **Top-10 concentration** — what % of total profit the top 10 items produce
- **Dead SKUs** — catalog items with no sales entries
- **Margin violations** — items below the target margin (default 60%, from `DEFAULT_INPUTS.targetMargin`)

Baseline number to write down before changing anything: **total monthly profit**.

### 2. Diagnose
Typical findings and what they mean:
- Top 10 items ≥ ~60% of profit → the business has 1–2 profit engines; everything else is a distraction
- Items with zero sales → inventory/training/decision cost with no revenue; cut candidates
- Adjacent price tiers ($59/$99 or $199/$299 memberships) → cannibalization; demand splits instead of growing
- Recurring low-margin lines → raise price, lower cost assumption to true incremental cost, or cut

### 3. Simplify — the cutting rules
- **Keep the profit engines whole.** Never cut an item in the top-10 profit list.
- **Keep price ladders, not price crowds.** Each product line keeps an entry offer, a core offer, and a premium anchor (e.g. Kickstart $899 → 6-Month $3,500). Cut middle rungs that sit within ~1.5× of a neighbor.
- **Memberships: 3 tiers max.** Entry (lead capture), Core (absorbs the best perks of cut tiers so it's the obvious choice), VIP (price anchor). Wide gaps between tiers.
- **Cut products, keep services.** The a la carte service menu costs nothing to list — cut bundles/packages, not underlying services.
- **Shift, don't delete, the volume.** When cutting an item, reassign its sales units to the nearest kept item (usually one rung up the ladder — model realistic uptake, not 100%).

### 4. Verify — hard gates before committing
1. Re-run `scripts/profit_analysis.py`: **total profit ≥ baseline** (target: higher)
2. **Every remaining item ≥ target margin** (60% default)
3. Tests pass (`./node_modules/.bin/react-scripts test --watchAll=false`) — update tests that reference cut item names
4. Build clean (`./node_modules/.bin/react-scripts build` → "Compiled successfully", zero warnings)

### 5. Report
Present a before/after table: SKU count, monthly profit, revenue, margin floor. State the cutting rationale in one line per category. Commit with the profit delta in the commit message.

## Data locations (this repo)
- Catalog + sales: `dose-calculator/src/data/constants.js` (DEFAULT_MEMBERSHIPS uses `totalCost`, others use `cost`)
- Target margin: `DEFAULT_INPUTS.targetMargin`
- Tests referencing item names: `dose-calculator/src/App.test.js`
- Components render whatever the data contains — catalog edits need no component changes

## Reference result (Jun 2026 run)
52 SKUs → 16 SKUs (3 memberships / 4 bundles / 9 packages); profit $475,042 → $531,583/mo (+12%); all margins ≥60%. Profit engines: Weight Loss (Semaglutide/Tirzepatide/WL programs) + TRT.
