---
title: Architecture
---

# Architecture

## Layout

| Path | What |
|---|---|
| [`src/index.ts`](https://github.com/roola-xyz/leo/blob/main/src/index.ts) | The public API: every export an application may import |
| [`src/theme.css`](https://github.com/roola-xyz/leo/blob/main/src/theme.css) | The theme, exported as `@roola/leo/theme.css` |
| `src/components/<Name>/index.tsx` | One folder per component, with `<Name>.stories.tsx` beside it and, where there is one, `<Name>.test.tsx` |
| `src/hooks/` | `useLocalePreference`, `usePush`, `useScrolled` |
| `src/i18n/` | `LocaleProvider`, `createTranslations`, the message parser and formatter (`format.ts`), the `Intl` formatters (`intl.ts`), and `messages/<tag>.ts` — Leo's own strings in twelve languages |
| [`src/languages.ts`](https://github.com/roola-xyz/leo/blob/main/src/languages.ts) | `LANGUAGES`, `LocaleTag`, `DEFAULT_LOCALE`, `preferredLocale` |
| `src/cn.ts` | A five-line class-name joiner (no clsx or tailwind-merge) |
| `src/assets/` | Images used by stories |
| `.storybook/` | Storybook config: stories glob `src/**/*.stories.*`, addons docs, a11y, vitest and dark-mode |
| `vite.config.ts` | Library build: ES and CJS, React external, types via `vite-plugin-dts` |
| `vitest.config.ts` | Two Vitest projects, `unit` and `browser` |
| `.github/workflows/` | CI (below) |
| `dist/` | A committed library build. Applications in the monorepo do not use it |

## Consumed as source

`package.json` sets `main`, `module`, `types` and `exports["."]` to `./src/index.ts`, and `exports["./theme.css"]` to `./src/theme.css`. An application that links Leo imports TypeScript straight from `src/` and compiles it in its own Vite build, with its own Tailwind generating the classes. Two rules follow:

- **Relative imports only inside Leo.** The application's TypeScript resolves Leo's files through the link and has no idea what an `@/` alias inside Leo would mean.
- **React must be deduped** in the application's Vite config, since the link brings its own `node_modules`.

`sideEffects` is `["*.css"]`, so bundlers may tree-shake every unused component.

## Theming model

Components never name a colour. They use Tailwind utilities such as `bg-primary` or `text-on-surface-variant`, which `@theme inline` maps to CSS variables (`--md-primary` …); `:root` and `.dark` give those variables their light and dark values. One set of components therefore works in both schemes with no `dark:` variants inside them. See [Theming](Theming.md).

## Words

Every visible string in a Leo component comes from Leo's own bundled catalogue through `useLeoTranslations()`, which follows the nearest `LocaleProvider` and falls back to English outside one. Composites that need product-specific wording (`ReportDialog`, `PushSwitch`, `UserMenu` via `labels`) take it as props. Applications build their own catalogues with `createTranslations`, which uses the same parser. See [Translation](Translation.md).

## Data the composites fetch

Most components are presentational. The exceptions, and what they expect from the host:

| Component | Fetches | Expected response |
|---|---|---|
| `AppsMenu` | `GET {accountsUrl}/api/apps` on first open | `{ apps: [{ name, description, url, icon }] }` |
| `PlatformGate` | Whatever `fetchStatus()` does, once on mount | a `PlatformStatus` |
| `PushSwitch` / `usePush` | Registers a service worker (default `/sw.js`) and calls the host's `PushApi` | |

Everything else takes data and callbacks as props.

## Build and CI

`pnpm build` produces `dist/index.es.js`, `dist/index.cjs.js` and declarations, with `react`, `react-dom` and `react/jsx-runtime` external.

| Workflow | On | Does |
|---|---|---|
| `testing.yml` | push to `main`, `dev` | `pnpm vitest run --coverage` (Chromium installed), uploads the report, updates the coverage badge |
| `linting.yml` | push and PR to `main`, `dev` | ESLint |
| `building.yml` | push and PR to `main`, `dev` | `pnpm build` |
| `deploying.yml` | push to `main` | Tests, then `storybook:build` and deploy to GitHub Pages |
| `version.yml` | push to `main`, `dev` | Updates the version badge in the README |

---

- [Home](index.md)
- [Getting started](Getting-started.md)
- [Architecture](Architecture.md)
- [Components](Components.md)
- [Theming](Theming.md)
- [Translation](Translation.md)
- [Contributing](Contributing.md)
