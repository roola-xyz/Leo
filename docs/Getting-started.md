---
title: Getting started
---

# Getting started

## Using Leo from an application

Leo is not installed from a registry. An application links a local checkout of it and compiles the source.

**1. Link it.** In the application's `package.json`, point a `link:` dependency at the checkout. The path is relative to that `package.json`:

```jsonc
"dependencies": {
  "@roola/leo": "link:../path/to/leo"
}
```

Then `pnpm install`. If the checkout moves, update the path and run `pnpm install` again — the `node_modules/@roola/leo` symlink is not updated by editing `package.json` alone, and Vite then fails with "Failed to resolve import @roola/leo".

**2. Dedupe React.** Leo is a link with its own `node_modules`, so without this its components import a second copy of React and every hook in them throws:

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
```

Add `react-router-dom` (or anything else stateful that both sides import) to the list if the application shares it with code inside the link.

**3. Import the theme after Tailwind.** The simplest form:

```css
/* src/index.css */
@import "tailwindcss";
@import "@roola/leo/theme.css";

/* Application overrides go underneath — see Theming. */
```

`theme.css` carries `@source "./components"`, relative to itself, so Tailwind generates the components' classes even though Tailwind's automatic detection skips `node_modules`.

**Recommended: pin Tailwind's sources.** Tailwind 4's automatic source detection will follow the `@roola/leo` symlink and crawl Leo's own `node_modules` (Storybook, Playwright, Vitest) and any `storybook-static` build. That costs gigabytes of memory per dev server and seconds per build. Turn detection off and list sources explicitly:

```css
@import "tailwindcss" source(none);
@source "../index.html";
@source "./";
@source "../node_modules/@roola/leo/src";

@import "@roola/leo/theme.css";
```

Reaching Leo through `../node_modules/@roola/leo/src` reads the same in every application however deep it sits; Vite resolves the symlink.

**4. Use it.**

```tsx
import { Button, Card, CardHeader, CardBody, Field } from "@roola/leo";

<Card>
  <CardHeader title="Sign in" />
  <CardBody>
    <Field label="Email" type="email" />
    <Button>Continue</Button>
  </CardBody>
</Card>
```

Wrap the application root in a `LocaleProvider` (or the `I18nProvider` from `createTranslations`, which includes one) if it is translated; Leo's components work without one and fall back to English. Set the `dark` class on `<html>` to switch theme — see [Theming](Theming.md).

### Vite's dependency cache

A consuming app that pre-bundles `@roola/leo` (it appears in `optimizeDeps`, or Vite decided to) can keep serving an old copy of a component after Leo changes. Clear the cache and restart Vite: delete `node_modules/.vite` in the application and touch its `vite.config.ts`.

## Working on Leo

Requires Node 22 and pnpm.

```bash
git clone git@github.com:roola-xyz/leo.git
cd leo
pnpm install
pnpm exec playwright install chromium   # once, for the browser test project
```

| Command | Does |
|---|---|
| `pnpm storybook` | Storybook dev server on port 6006, every component in light and dark |
| `pnpm storybook:build` | Static Storybook into `storybook-static/` |
| `pnpm check-types` | `tsc --noEmit` |
| `pnpm test` | Vitest, both projects (watch mode) |
| `pnpm exec vitest run --project unit` | `*.test.ts(x)` files in happy-dom |
| `pnpm exec vitest run --project browser` | Every story as a test in headless Chromium |
| `pnpm exec vitest run --project browser UserMenu` | One component's stories |
| `pnpm lint` / `pnpm lint:fix` | ESLint (with Prettier, jsx-a11y, react-hooks, storybook plugins) |
| `pnpm build` | Library bundle into `dist/` (`index.es.js`, `index.cjs.js`, type declarations) |
| `pnpm dev` | Vite dev server |

Note that the `test:unit` and `test:browser` scripts in `package.json` call `vite test`, which is not a Vite command; use `pnpm exec vitest run --project <name>` as above.

There are no environment variables.

---

- [Home](index.md)
- [Getting started](Getting-started.md)
- [Architecture](Architecture.md)
- [Components](Components.md)
- [Theming](Theming.md)
- [Translation](Translation.md)
- [Contributing](Contributing.md)
