---
name: new-app
description: Scaffold, test, and wire a new React app into this monorepo with Vercel, Netlify, and GitHub Pages deployment. Use when the user asks to build, add, or create a new app in this repository.
---

# Add a New App to the Monorepo

This repo is a multi-app monorepo (bridge-child, dose-calculator, wellness-check, reel-method, reelverse-momentum, stw-landing). Each app is a self-contained Create React App in its own directory, deployed to three platforms. Follow this exact pattern for every new app.

Take an app name in kebab-case (e.g. `reelverse-mirror`). Referred to below as `<app>`.

## 1. Scaffold

Create `<app>/` at the repo root with this structure:

```
<app>/
  .gitignore            → two lines: /node_modules and /build
  package.json          → copy shape from reelverse-momentum/package.json; change "name" to <app>.
                          Include @testing-library deps ONLY if writing tests (always write tests).
  vercel.json           → { "framework": "create-react-app" }
  netlify.toml          → base = "<app>", command = "npm install && npm run build",
                          publish = "build", plus SPA redirect /* → /index.html 200
  public/index.html     → minimal CRA template. Set <title>, theme-color, and meta description
                          to match the app. No boilerplate comments. viewport-fit=cover.
  src/index.css         → html,body,#root { margin:0; padding:0; height:100%; background:<bg color>; }
  src/index.js          → standard CRA entry with React.StrictMode
  src/setupTests.js     → import '@testing-library/jest-dom';
  src/App.js            → the app itself
  src/App.test.js       → tests (see §3)
```

Do NOT create `manifest.json`/`robots.txt` unless the app needs PWA install support — recent apps (stw-landing, reelverse-momentum) skip them.

## 2. App conventions

- Single-file `App.js` with inline styles; no CSS frameworks, no extra deps.
- Theme constant `C = {...}` at top; brand apps use the Shape The Wave palette
  (bg `#06080e`, card `#111827`, border `#1f2937`, accent wave `#06b6d4`).
- Fonts via Google Fonts `@import` inside an injected `<style>` element
  (`Styles()` component pattern — see reelverse-momentum/src/App.js).
- Mobile-first: `maxWidth` 480, `height:"100dvh"`, `env(safe-area-inset-*)` padding.
- Persistence: `localStorage` only, wrapped in try/catch load/save helpers. Never a server.
- Accessibility is required: semantic `<header>/<main>/<nav>`, `role="tablist"`/`role="tab"`/
  `aria-selected` on bottom nav, `aria-label` on icon-only buttons, `aria-pressed` on toggles.
- Brand text: use `&#8482;` for ™ in JSX; pillar colors and REEL step colors come from
  reel-method/src/App.js if the app is part of the ecosystem.

## 3. Tests

Write `src/App.test.js` with `@testing-library/react`. Minimum coverage:
- Header/title renders
- Bottom nav renders with correct tab count and aria-labels (query by `getAllByRole('tab')`)
- Each screen reachable by clicking its nav tab (query nav buttons via `getByLabelText`)
- Core interaction works (toggle/check/create/delete as applicable)
- `beforeEach(() => localStorage.clear())` when state persists

Gotchas learned in this repo:
- Text broken across elements (emoji + label) needs regex matchers: `getByText(/Mind/)`.
- Duplicate strings on screen (nav label vs card title) — disambiguate by role, tagName, or aria-label, never bare `getByText`.

## 4. Wire into deployment

Three places, all required:

1. `<app>/vercel.json` and `<app>/netlify.toml` — created in §1.
2. `.github/workflows/deploy-pages.yml` — add BOTH:
   - a `Build <app>` step (copy an existing one; set `PUBLIC_URL: /JuliaGekhter/<app>` and `CI: false`)
   - `<app>` in the `Assemble dist` step: add to `mkdir -p` list and add a
     `cp -r <app>/build/* dist/<app>/` line.
   Note: `stw-landing` builds with `PUBLIC_URL: /JuliaGekhter` and copies to `dist/` root — do not disturb it.
3. If the app should appear on the landing page, add a card/link in `stw-landing/src/App.js`.

## 5. Verify

From `<app>/`:
```
npm install
npm run build     # must compile with ZERO warnings
npm test -- --watchAll=false   # all tests must pass
```
Fix warnings and failures before committing. Warnings become errors under `CI=true` on some platforms.

## 6. Commit and push

- Git identity must be `Claude <noreply@anthropic.com>` (a stop hook rejects other committer emails).
- Stage explicitly: app directory files + `package-lock.json` + the workflow file. Never commit `node_modules/` or `build/`.
- One commit, descriptive message listing screens/features/tests.
- Branch: use the session's designated `claude/...` branch. NEVER push to `main` — it is blocked; deployment happens by merging a PR.
- Push with `git push -u origin <branch>`.
- PRs cannot be created programmatically here (git proxy only, no GitHub API). Give the user the compare URL: `https://github.com/JuliaGekhter/JuliaGekhter/pull/new/<branch>`.

## 7. Report

End with: what the app does per screen, test count, build status, deployed paths
(`/JuliaGekhter/<app>/` on Pages), and what the user must do (create/merge the PR).
