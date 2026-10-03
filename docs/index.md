---
title: Home
---

# Leo

Leo (`@roola/leo`) is Roola's design system for React: Material 3 primitives, a handful of composites that every Roola web application shares (the account menu, the apps launcher, the waiting-list page and a few others), the translation machinery those applications build on, and `theme.css`, the colour roles, shape and motion they are all drawn in.

It is consumed **as source**: `package.json` points `main`, `types` and `exports` at `src/`, applications link the package rather than install a published version, and their own Vite build compiles whatever they import. There is nothing to publish or rebuild to pick up a change. A library build (`pnpm build`) exists for use outside that setup.

## What it is not

A product's logo, its feature components, and anything whose look is a decision one product made for itself rather than a shared one. Product-specific component libraries sit on top of Leo and keep those.

## Stack

| | |
|---|---|
| Language | TypeScript 5.9 |
| UI | React 19 (peer: React 18.3 or 19) |
| Styling | Tailwind CSS 4, Material Design 3 colour roles as CSS variables |
| Docs and tests | Storybook 10 with `@storybook/addon-vitest`; Vitest 4 (happy-dom unit project, Playwright Chromium browser project) |
| Build | Vite 8 library mode with `vite-plugin-dts` |
| Package manager | pnpm (pinned in `packageManager`) |
| Licence | MIT |

Live Storybook: <https://roola-xyz.github.io/Leo/>

## Pages

- [Getting started](Getting-started.md) — linking Leo into an application, the Vite and Tailwind setup, working on Leo itself
- [Architecture](Architecture.md) — repository layout, how source consumption works, the build and CI
- [Components](Components.md) — every export, with its props
- [Theming](Theming.md) — the colour roles, dark mode, shape, type, motion, overriding tokens
- [Translation](Translation.md) — `LANGUAGES`, `LocaleProvider`, `createTranslations`, the message syntax, formatters
- [Contributing](Contributing.md) — conventions for adding a component, stories as tests, linting

Source: [roola-xyz/leo](https://github.com/roola-xyz/leo) · README: [https://github.com/roola-xyz/leo/blob/main/README.md](https://github.com/roola-xyz/leo/blob/main/README.md)

---

- [Home](index.md)
- [Getting started](Getting-started.md)
- [Architecture](Architecture.md)
- [Components](Components.md)
- [Theming](Theming.md)
- [Translation](Translation.md)
- [Contributing](Contributing.md)
