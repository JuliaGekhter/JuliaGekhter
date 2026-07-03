---
name: show-platform
description: Run the Shape The Wave dashboard locally and capture screenshots of every tab to send to the user. Use when asked to "show it", "show it all", demo the app, or provide visual proof after changes.
---

# Show the Platform (Dev Server + Screenshots)

## 1. Start the dev server
From `dose-calculator/`:
```bash
PORT=3000 npx react-scripts start &
sleep 20 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000   # expect 200
```
"Something is already running on port 3000" means it's already up — just proceed.

## 2. Screenshot every tab
The playwright **CLI cannot click tabs** — only script it. Requirements:
- `npm install playwright` locally in `dose-calculator/` (the node script needs the module resolvable from cwd)
- Launch with the preinstalled browser: `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'` (verify with `find /opt/pw-browsers -name chrome`); never run `playwright install`

```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const tabs = ['Dashboard','Patients','Operations', /* ...read current labels from App.js tabs array */];
  for (let i = 0; i < tabs.length; i++) {
    await page.click('button:text-is(\"' + tabs[i] + '\")');   // text-is = exact match (labels collide with headings)
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'shot-' + (i+1) + '-' + tabs[i].toLowerCase().replace(/ /g,'-') + '.png' });
  }
  await browser.close();
})();"
```
Read the tab labels from the `tabs` array in `src/App.js` first — don't hardcode a stale list.

## 3. Deliver
- Read 2–3 key screenshots yourself to verify they rendered (not blank/error pages) before sending
- Send with SendUserFile, one caption per image naming the tab and its headline number (e.g. revenue)
- **Delete the .png files before ending the turn** — the git stop hook flags untracked files. Never commit screenshots.
