# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Checkbox/Checkbox.spec.ts >> Checkbox component >> Default checkbox should be unchecked
- Location: src/components/Checkbox/Checkbox.spec.ts:8:3

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:6006/iframe.html?id=components-checkbox--default", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading [level=1] [ref=e5]
  - paragraph
  - paragraph
```

# Test source

```ts
  1  | import { test, expect } from "playwright/test";
  2  | 
  3  | const STORYBOOK_BASE = "http://localhost:6006";
  4  | const STORYBOOK_IFRAME = "#storybook-preview-iframe";
  5  | const ROOT_LOCATOR = "#storybook-root";
  6  | 
  7  | test.describe("Checkbox component", () => {
  8  |   test("Default checkbox should be unchecked", async ({ page }) => {
  9  |     const info = test.info();
> 10 |     await page.goto(
     |                ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  11 |       `${STORYBOOK_BASE}/iframe.html?id=components-checkbox--default`,
  12 |       { waitUntil: "networkidle" },
  13 |     );
  14 | 
  15 |     const frame = page.frameLocator(STORYBOOK_IFRAME);
  16 |     const component = page.locator(ROOT_LOCATOR);
  17 | 
  18 |     // const checkboxInput = frame.locator('input[type="checkbox"]');
  19 | 
  20 |     // const checkboxBox = component.locator('div[role="checkbox"]'); // AriaCheckbox renders role="checkbox"
  21 |     // const checkboxInput = component.locator('input[type="checkbox"]'); // hidden input
  22 | 
  23 |     // const checkboxInput = component.locator('div[role="checkbox"]');
  24 |     // await checkboxInput.waitFor({ state: 'visible', timeout: 20000 });
  25 | 
  26 |     await expect(component).toBeVisible();
  27 |     // await expect(checkboxBox).toBeVisible();
  28 |     // await expect(checkboxInput).toBeVisible();
  29 | 
  30 |     // await component.screenshot({ path: `./src/components/Checkbox/Screenshots/Checkbox.Default.${info.project.name.replace(/[\s\-]+/g, '_')}.screenshot.png` });
  31 |   });
  32 | 
  33 |   test("Default checkbox should be checked", async ({ page }) => {
  34 |     const info = test.info();
  35 |     await page.goto(
  36 |       `${STORYBOOK_BASE}/iframe.html?id=components-checkbox--checked`,
  37 |       { waitUntil: "networkidle" },
  38 |     );
  39 | 
  40 |     const frame = page.frameLocator("#storybook-preview-iframe");
  41 | 
  42 |     const component = page.locator("#storybook-root");
  43 |     await expect(component).toBeVisible();
  44 | 
  45 |     // await component.screenshot({ path: `./src/components/Checkbox/Screenshots/Checkbox.Checked.${info.project.name.replace(/[\s\-]+/g, '_')}.screenshot.png` });
  46 |   });
  47 | 
  48 |   test("Default checkbox should be disabled", async ({ page }) => {
  49 |     const info = test.info();
  50 |     await page.goto(
  51 |       `${STORYBOOK_BASE}/iframe.html?id=components-checkbox--disabled`,
  52 |       { waitUntil: "networkidle" },
  53 |     );
  54 | 
  55 |     const frame = page.frameLocator("#storybook-preview-iframe");
  56 | 
  57 |     const component = page.locator("#storybook-root");
  58 |     await expect(component).toBeVisible();
  59 | 
  60 |     // await component.screenshot({ path: `./src/components/Checkbox/Screenshots/Checkbox.Disabled.${info.project.name.replace(/[\s\-]+/g, '_')}.screenshot.png` });
  61 |   });
  62 | 
  63 |   test("Default checkbox should be indeterminate", async ({ page }) => {
  64 |     const info = test.info();
  65 |     await page.goto(
  66 |       `${STORYBOOK_BASE}/iframe.html?id=components-checkbox--indeterminate`,
  67 |       { waitUntil: "networkidle" },
  68 |     );
  69 | 
  70 |     const frame = page.frameLocator("#storybook-preview-iframe");
  71 | 
  72 |     const component = page.locator("#storybook-root");
  73 |     await expect(component).toBeVisible();
  74 | 
  75 |     // await component.screenshot({ path: `./src/components/Checkbox/Screenshots/Checkbox.Indeterminate.${info.project.name.replace(/[\s\-]+/g, '_')}.screenshot.png` });
  76 |   });
  77 | });
  78 | 
```