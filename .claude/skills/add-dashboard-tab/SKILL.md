---
name: add-dashboard-tab
description: Add a new tab to the Shape The Wave dashboard (dose-calculator React app) following the established component/wiring/test pattern. Use when asked to add a feature area, section, or tab to the platform.
---

# Add a Dashboard Tab

The app is a tabbed shell: `src/App.js` holds state + tab nav; each tab is one component in `src/components/`. Currently 17 tabs (Dashboard … Mobile) plus the light-theme Patient App in `src/components/patient/`.

## Steps

1. **Component** — create `src/components/<Name>Tab.js`:
   - Single default export; import `useState`/`useMemo` only if used
   - Shared catalog data comes from `'../data/constants'` (patient/ subdir uses `'../../data/constants'`) — never duplicate data into components
   - Wrap sections in `<section className="panel"><h2>Title</h2>…</section>`

2. **Wire into App.js** (3 edits):
   - `import <Name>Tab from './components/<Name>Tab';`
   - Add `{ key: '<key>', label: '<Label>' }` to the `tabs` array
   - Add `{activeTab === '<key>' && <<Name>Tab />}` after the other tab renders

3. **CSS** — append to `src/App.css`, reusing existing patterns before inventing new ones: `.panel`, `.metrics-grid`/`.metric-card`, `.chart-bar` (+ gradient variants), `.category-tag`, card grids (`repeat(auto-fill, minmax(240px, 1fr))`), status badges (`rgba(color, 0.15)` bg + colored text). Dark theme via CSS vars (`--color-bg/surface/border/text/blue/green/orange/red/purple/teal`). Add a mobile breakpoint at 600–768px.

4. **Test** — add to `src/App.test.js`:
   ```jsx
   test('renders <Label> tab', () => {
     render(<App />);
     expect(screen.getByText('<Label>')).toBeInTheDocument();
   });
   ```

5. **Verify** (both must be clean):
   - `./node_modules/.bin/react-scripts test --watchAll=false` (run from `dose-calculator/` — `npx react-scripts` uses a stale npx cache; use the local binary)
   - `./node_modules/.bin/react-scripts build` → must say "Compiled successfully" with **zero warnings**

## Gotchas learned the hard way
- Unused vars/imports = build warnings → treat as failures
- Text appearing in multiple places (tab label + heading, item in card + sales table) breaks `getByText` — use `getAllByText(...).length).toBeGreaterThanOrEqual(1)`
- Literal `${...}` inside JSX strings triggers `no-template-curly-in-string` — write `{amount}` instead
- Tab labels must be unique across the whole page (tests match by text)
- For big tabs, delegate to a background agent with the full spec, then verify build/tests yourself before committing
