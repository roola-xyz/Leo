# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Tooltip/Tooltip.spec.ts >> Tooltip component >> shows tooltip on hover
- Location: src/components/Tooltip/Tooltip.spec.ts:17:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:6006/iframe.html?id=components-tooltip--default
Call log:
  - navigating to "http://localhost:6006/iframe.html?id=components-tooltip--default", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "playwright/test";
  2  | 
  3  | test.describe("Tooltip component", () => {
  4  |   const storybookUrl =
  5  |     "http://localhost:6006/iframe.html?id=components-tooltip--default";
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     // Navigate to Storybook iframe URL for the Tooltip default story
> 9  |     await page.goto(storybookUrl);
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:6006/iframe.html?id=components-tooltip--default
  10 |   });
  11 | 
  12 |   test("renders the tooltip component", async ({ page }) => {
  13 |     const tooltipTrigger = page.getByText("Hover me"); // adjust to text or aria-label in your story
  14 |     await expect(tooltipTrigger).toBeVisible();
  15 |   });
  16 | 
  17 |   test("shows tooltip on hover", async ({ page }) => {
  18 |     const tooltipTrigger = page.getByText("Hover me");
  19 | 
  20 |     // Hover to trigger tooltip
  21 |     await tooltipTrigger.hover();
  22 | 
  23 |     // The tooltip itself
  24 |     const tooltip = page.locator('[data-component="Tooltip"]');
  25 |     await expect(tooltip).toBeVisible();
  26 | 
  27 |     // Optional: check tooltip text
  28 |     await expect(tooltip).toHaveText("Tooltip Content");
  29 |   });
  30 | 
  31 |   test("tooltip hides after mouse leave", async ({ page }) => {
  32 |     const tooltipTrigger = page.getByText("Hover me");
  33 | 
  34 |     await tooltipTrigger.hover();
  35 |     const tooltip = page.locator('[data-component="Tooltip"]');
  36 |     await expect(tooltip).toBeVisible();
  37 | 
  38 |     // Move mouse away
  39 |     await page.mouse.move(0, 0);
  40 | 
  41 |     // Tooltip should disappear (animation delay might require wait)
  42 |     await page.waitForTimeout(250);
  43 |     await expect(tooltip).not.toBeVisible();
  44 |   });
  45 | });
  46 | 
```