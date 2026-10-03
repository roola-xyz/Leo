# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: StyledText/StyledText.spec.ts >> StyledText component >> renders h1 heading with semibold text
- Location: src/components/StyledText/StyledText.spec.ts:16:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:6006/iframe.html?id=components-styledtext--default
Call log:
  - navigating to "http://localhost:6006/iframe.html?id=components-styledtext--default", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "playwright/test";
  2  | 
  3  | test.describe("StyledText component", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to the Storybook iframe or a page that renders the component
> 6  |     await page.goto("/iframe.html?id=components-styledtext--default");
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:6006/iframe.html?id=components-styledtext--default
  7  |   });
  8  | 
  9  |   test("renders default text", async ({ page }) => {
  10 |     const el = page.locator('[data-component="StyledText"]');
  11 |     await expect(el).toHaveText("Sample Text");
  12 |     await expect(el).toHaveClass(/text-16/);
  13 |     await expect(el).toHaveClass(/text-neutral-900/);
  14 |   });
  15 | 
  16 |   test("renders h1 heading with semibold text", async ({ page }) => {
  17 |     await page.goto("/iframe.html?id=components-styledtext--heading");
  18 |     const el = page.locator('[data-component="StyledText"]');
  19 |     await expect(el).toHaveText("Heading Text");
  20 |     await expect(el).toHaveClass(/text-32/);
  21 |     await expect(el).toHaveClass(/font-semibold/);
  22 |     await expect(el.evaluate((e) => e.tagName)).resolves.toBe("H1");
  23 |   });
  24 | 
  25 |   test("renders secondary colour text", async ({ page }) => {
  26 |     await page.goto("/iframe.html?id=components-styledtext--secondary");
  27 |     const el = page.locator('[data-component="StyledText"]');
  28 |     await expect(el).toHaveText("Secondary Text");
  29 |     await expect(el).toHaveClass(/text-neutral-700/);
  30 |   });
  31 | 
  32 |   test("renders italic and underlined text", async ({ page }) => {
  33 |     await page.goto("/iframe.html?id=components-styledtext--italic-underlined");
  34 |     const el = page.locator('[data-component="StyledText"]');
  35 |     await expect(el).toHaveText("Italic & Underlined");
  36 |     await expect(el).toHaveClass(/italic/);
  37 |     await expect(el).toHaveClass(/underline/);
  38 |   });
  39 | });
  40 | 
```