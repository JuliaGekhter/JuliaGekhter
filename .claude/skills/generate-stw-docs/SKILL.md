---
name: generate-stw-docs
description: Regenerate the Shape The Wave Word documents (business model doc and Zenoti UAT plan) from the current catalog data in dose-calculator/src/data/constants.js. Use after any pricing, membership, bundle, or package change, or when the user asks for "the doc", "Word document", "UAT", or deliverables.
---

# Generate Shape The Wave Word Documents

Two deliverables, both built with python-docx (`pip install python-docx` if missing):

1. **`Shape_the_Wave_Memberships.docx`** — complete business model
2. **`Shape_the_Wave_Zenoti_UAT.docx`** — Zenoti implementation UAT plan

## Source of truth
Read current data from `dose-calculator/src/data/constants.js` — never hardcode stale numbers. The catalog changes often; the doc must match DEFAULT_MEMBERSHIPS / DEFAULT_BUNDLES / DEFAULT_PACKAGES / DEFAULT_SERVICES / DEFAULT_CPT_CODES exactly.

## Formatting conventions (locked)
- Calibri 11pt body, Table Grid style, blue header rows (#2E75B6) with white bold text, alternating light-blue row shading
- Footer on every page: `Shape The Wave Longevity™ — Gurnee, IL | 847-625-8300 | shapethewave.com` (UAT doc: `— Zenoti UAT Plan — Confidential`)
- Title: "Shape The Wave Longevity™ — <subtitle>"

## Business model doc structure
1. Brand: Shape The Wave Longevity™ → REEL™ Align Method™ → ReelVerse AI™ → ReelVerse OS™; tagline "Optimize health. Align habits. Live longer, better."; ecosystem (Coach, Mirror, Compass, Momentum, Academy, Certified REEL Method Practitioner™); REEL framework (Reflect · Envision · Execute · Learn · Align)
2. Memberships — tiers with price, starter fee, credits, referral bonus, services, products, margins
3. Bundles — product groupings with items and prices
4. Packages — multi-month programs with durations and included services
5. Services — a la carte with Self Pay / Insurance / BCBS columns
6. CPT Codes — from DEFAULT_CPT_CODES (current + 2025 fee)
7. Financial projections summary + optimization/before-after table when relevant

## Zenoti UAT doc structure (11 sections, each ends with a UAT checklist table)
Center Setup (Gurnee IL, Mon–Sat, Athena integration) · Staff (Dr. Tack MD, PA Johnson, NP Williams, MA Garcia) · Services (duration, 3-tier pricing, CPT, providers) · Memberships (billing/credits/upgrade/downgrade/freeze tests) · Packages · Products & Bundles (inventory, suppliers: Empower, Robard, Henry Schein, HealthLab) · Billing & CPT · Patient Management (intake, consents, HIPAA) · Booking (reminders, $75 no-show fee) · Reporting · Go-Live checklist with sign-off page

## Process
1. Write the generator script to the **scratchpad directory** (never the repo — a stray `generate_doc.py` trips the git stop hook)
2. Run it; save the .docx files to the repo root
3. For large docs, delegate to a background agent with the full section spec
4. Commit the .docx files, push, then send to the user with SendUserFile
