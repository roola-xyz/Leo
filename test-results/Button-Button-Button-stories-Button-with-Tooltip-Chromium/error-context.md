# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Button/Button.spec.ts >> Button stories >> Button with Tooltip
- Location: src/components/Button/Button.spec.ts:49:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:6006/iframe.html?id=components-button--withtooltip
Call log:
  - navigating to "http://localhost:6006/iframe.html?id=components-button--withtooltip", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "playwright/test";
  2  | 
  3  | const STORYBOOK_BASE =
  4  |   "http://localhost:6006/iframe.html?id=components-button--";
  5  | 
  6  | test.describe("Button stories", () => {
  7  |   test("Primary button", async ({ page }) => {
  8  |     await page.goto(`${STORYBOOK_BASE}primary`);
  9  |     const button = page.getByRole("button", { name: /button/i });
  10 |     await expect(button).toBeVisible();
  11 |     await button.click();
  12 |   });
  13 | 
  14 |   test("Secondary button", async ({ page }) => {
  15 |     await page.goto(`${STORYBOOK_BASE}secondary`);
  16 |     const button = page.getByRole("button", { name: /button/i });
  17 |     await expect(button).toBeVisible();
  18 |     await button.click();
  19 |   });
  20 | 
  21 |   test("Tertiary button", async ({ page }) => {
  22 |     await page.goto(`${STORYBOOK_BASE}tertiary`);
  23 |     const button = page.getByRole("button", { name: /button/i });
  24 |     await expect(button).toBeVisible();
  25 |     await button.click();
  26 |   });
  27 | 
  28 |   test("Button with icons", async ({ page }) => {
  29 |     await page.goto(`${STORYBOOK_BASE}withicon`);
  30 |     const button = page.getByRole("button", { name: /button/i });
  31 |     await expect(button).toBeVisible();
  32 |     await button.click();
  33 |   });
  34 | 
  35 |   test("Icon-only button", async ({ page }) => {
  36 |     await page.goto(`${STORYBOOK_BASE}icononly`);
  37 |     const button = page.getByRole("button");
  38 |     await expect(button).toBeVisible();
  39 |     await button.click();
  40 |   });
  41 | 
  42 |   test("Link button", async ({ page }) => {
  43 |     await page.goto(`${STORYBOOK_BASE}link`);
  44 |     const button = page.getByRole("button", { name: /button/i });
  45 |     await expect(button).toBeVisible();
  46 |     await button.click();
  47 |   });
  48 | 
  49 |   test("Button with Tooltip", async ({ page }) => {
> 50 |     await page.goto(`${STORYBOOK_BASE}withtooltip`);
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:6006/iframe.html?id=components-button--withtooltip
  51 |     const button = page.getByRole("button", { name: /hover me/i });
  52 |     await expect(button).toBeVisible();
  53 | 
  54 |     // Hover to show tooltip
  55 |     await button.hover();
  56 | 
  57 |     // Wait for tooltip to appear (accounts for React Aria 200ms delay)
  58 |     const tooltip = page.getByText("Tooltip content");
  59 |     await expect(tooltip).toBeVisible();
  60 |   });
  61 | });
  62 | 
```