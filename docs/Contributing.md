---
title: Contributing
---

# Contributing

The repository's [`CONTRIBUTING.md`](https://github.com/roola-xyz/leo/blob/main/CONTRIBUTING.md) is a general template; this page describes how the code is actually organised. Report security issues as [`SECURITY.md`](https://github.com/roola-xyz/leo/blob/main/SECURITY.md) describes, not as public issues.

## What belongs in Leo

A component belongs here when every application would draw it the same way: a primitive, or a composite whose look and behaviour is a shared decision (an account menu, a launcher). A product's logo, its feature components, and anything one product styles its own way stay in that product. Components that fetch data are the exception rather than the rule; the few that do take the base URL or a fetch function as a prop (see [Architecture](Architecture.md)).

## Adding a component

1. Create `src/components/<Name>/index.tsx` and export named functions (no default export).
2. **Use relative imports only** (`../Icon`, `../../cn`). An `@/` alias would not resolve in the applications that compile Leo's source.
3. **Name roles, not colours.** Use the theme's utilities (`bg-surface`, `text-on-surface-variant`, `border-outline-variant`); no hex values and no `dark:` variants for colour. If a role is missing, add it to `theme.css` in both `:root, .surface-scheme` and `.dark, .dark .surface-scheme`, and to `@theme inline`. See [Theming](Theming.md).
4. **No hard-coded words.** Add keys to `src/i18n/messages/en.ts` and to every other language file, and read them with `useLeoTranslations()`. Wording a product may need to change goes in a `labels` prop.
5. Gate any animation with `motion-safe:`.
6. Export it, and any public types, from `src/index.ts`.
7. Write `src/components/<Name>/<Name>.stories.tsx` (below).
8. Run `pnpm check-types`, `pnpm lint` and the component's tests.

`cn` is a plain joiner; do not add clsx or tailwind-merge for conflict resolution — design the class lists so they do not conflict.

## Stories are the documentation and the tests

Every component has a `*.stories.tsx`. Storybook is configured with `@storybook/addon-vitest`, so the `browser` Vitest project runs every story (and its `play` function, if any) in headless Chromium, with `@storybook/addon-a11y` annotations applied (a11y findings are reported, not failing: `a11y.test: "todo"`).

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Active" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
```

A story whose component keeps state in `localStorage` must clear it first (the `AppsMenu` stories remove `roola.apps.favourites`), or results depend on the order stories ran in.

```bash
pnpm exec vitest run --project browser            # all stories
pnpm exec vitest run --project browser UserMenu   # one component
```

## Unit tests

Plain `*.test.ts(x)` files run in the `unit` project under happy-dom (`src/components/Avatar/Avatar.test.tsx`, `src/i18n/format.test.ts`). Two things to know:

- jest-dom matchers are **not** installed in the unit project (`vitest.setup.ts` has the import commented out), so `toBeInTheDocument()` and friends throw "Invalid Chai property". Assert on the DOM directly.
- An `<img alt="">` is presentational and has no `img` role; query it with `container.querySelector("img")`.

## Linting and formatting

ESLint 9 flat config (`eslint.config.ts`) with typescript-eslint, react, react-hooks, jsx-a11y, storybook, unused-imports, and Prettier as an ESLint rule (`prettier/prettier: error`). `pnpm lint:fix` applies fixes.

## Branches and CI

`main` and `dev` run the lint, build, test and version workflows on push; pull requests into either run lint and build. A push to `main` also rebuilds and publishes the Storybook site to GitHub Pages. See [Architecture](Architecture.md) for the workflow table.

---

- [Home](index.md)
- [Getting started](Getting-started.md)
- [Architecture](Architecture.md)
- [Components](Components.md)
- [Theming](Theming.md)
- [Translation](Translation.md)
- [Contributing](Contributing.md)
