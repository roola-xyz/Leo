<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/leo-dark.svg">
    <img src=".github/assets/leo-light.svg" height="72" alt="Leo">
  </picture>
</p>

![Version](https://img.shields.io/badge/Version-0.1.0-blue)
![React 19](https://img.shields.io/badge/Library-React_19-informational?style=flat&logo=react&color=61DAFB)
![TypeScript 5.9](https://img.shields.io/badge/Code-TypeScript_5.9-informational?style=flat&logo=typescript&color=3178C6)
![Tailwind 4](https://img.shields.io/badge/Styling-Tailwind_4-informational?style=flat&logo=tailwindcss&color=06B6D4)
![Material 3](https://img.shields.io/badge/Design-Material_3-informational?style=flat&logo=materialdesign&color=757575)
[![Storybook](https://img.shields.io/badge/Docs-Storybook-informational?style=flat&logo=storybook&color=FF4785)](https://roola-xyz.github.io/Leo/)

# Leo

The Roola design system: Material 3 primitives, the composites every Roola
application shares, and the theme they are drawn in.

```tsx
import { Button, Card, CardBody, Field } from "@roola/leo";
```

Every application in the estate — accounts, cloud, control, support, policies,
helix, socialise — used to carry its own copy of these under
`frontend/packages/ui`. They were byte-for-byte identical, and the parts that
were not had drifted by accident rather than on purpose. This package is those
components, once.

Built with **TypeScript**, **React 19**, **Tailwind 4** and **Storybook**;
consumed as source, so an application compiles what it uses and nothing has to
be published or rebuilt to pick up a change.

## What's here

| Kind | Components |
| --- | --- |
| Primitives | `Alert` `Avatar` `Badge` `Button` `Card` (`CardHeader`, `CardBody`) `Chip` `Field` `Icon` `IconButton` `LanguageSelect` `Menu` (`MenuItem`, `MenuLabel`, `MenuSeparator`) `Select` `Skeleton` `Spinner` `TextArea` `ThemeToggle` |
| Figures | `Chart` — a time series as a line or bars, hand-drawn SVG; `Stat` — one headline figure with its note and a sparkline |
| Panels | `PanelSurface` `PanelTopLine` `PanelGroup` — the panel that drops from the app bar, under the account menu and the launcher |
| Composites | `AppsMenu` — the launcher for every Roola application; `UserMenu` — the account menu in the app bar; `VerificationToast` — the identity check a support agent raises during a call; `ReportDialog` — telling us something is wrong with a thing; `WaitingList` and `PlatformGate` — what a platform's door says while it is closed; `PushSwitch` — the switch for notifications, with its sentence |
| Hooks | `useScrolled` `useLocalePreference` `useFormatters` `useLeoTranslations` `usePush` |
| Translation | `LocaleProvider` `createTranslations` — see below |
| Utilities | `cn` |
| Theme | `theme.css` — the M3 colour roles in light and dark, the shape scale, the type |

What is deliberately *not* here: a product's mark, its feature components, and
anything whose look is a decision that product made for itself rather than one
the estate made once. Helix keeps those in [Spiral](https://github.com/HelixTube/Spiral), built
on Leo; Politicise keeps its own primitives in [Libra](https://github.com/Politicise/Libra),
which takes only Leo's translation machinery.

## Using it from an application

Each application's frontend is its own pnpm workspace, so Leo is linked rather
than depended on by version:

```jsonc
// platform/<app>/package.json
"dependencies": {
  "@roola/leo": "link:../../../../../packages/roola/leo"
}
```

```ts
// vite.config.ts — Leo is a link with its own node_modules; without this its
// components would import a second React and every hook in them would throw.
resolve: {
  dedupe: ["react", "react-dom"],
},
```

```css
/* src/index.css */
@import "tailwindcss";
@import "@roola/leo/theme.css";

/* Anything the application changes goes underneath: a later declaration on
   :root wins at the same specificity, so redefine --md-primary here rather
   than editing the theme. */
```

`theme.css` carries its own `@source` for the components, so Tailwind generates
their classes without the application knowing where the package lives.

## Translation

Every Roola site is offered in the twelve languages of `LANGUAGES`, and the
preference is one preference, saved to the account and cached under
`roola.locale` in every browser. Leo carries the machinery once; each
application carries its own words.

```ts
// src/i18n.ts — the catalogue, English as the type, the rest on demand
import { createTranslations } from "@roola/leo";
import en from "./locales/en";

export const { I18nProvider, useTranslations, translate } = createTranslations({
  en,
  es: () => import("./locales/es"),
  fr: () => import("./locales/fr"),
  // … one loader per language in LANGUAGES
});
```

```tsx
// src/main.tsx — once, at the root; it holds the LocaleProvider too
<I18nProvider>
  <App />
</I18nProvider>

// anywhere under it
const { t, rich, date, number } = useTranslations();
<h1>{t("home.title")}</h1>
<p>{rich("home.intro", { link: (chunks) => <Link to="/help">{chunks}</Link> })}</p>
<time>{date(post.created_at)}</time>
```

Messages are an ICU subset — `{name}`, `{count, plural, one {…} other {…}}`,
`{kind, select, …}` and `<tag>…</tag>` — formatted by `Intl`, so plural rules
and number shapes come from the locale rather than from anybody's memory. A
translation file is typed against English, so a missing key does not compile.

`localeHeaders()` gives the `Accept-Language` every request to a Roola backend
should carry, which is how a validation message comes back in the language of
the form it is about. Leo's own composites — the account menu, the report
dialog, the waiting list — read the same locale and need no wiring.

## Working on it

```bash
pnpm install
pnpm storybook        # every component, light and dark, at :6006
pnpm check-types
pnpm test             # vitest: unit, and the stories in a browser
pnpm build            # a bundle, for use outside the monorepo
```

Every component has a `*.stories.tsx` beside it. Add one with the component;
the stories are the documentation and, through `@storybook/addon-vitest`, the
tests.

Components use relative imports only — an application's TypeScript resolves
Leo's files through the link, and would not know what `@/` means.

## Licence

MIT. Security issues to ijeffrouk@gmail.com, please, rather than an issue.
