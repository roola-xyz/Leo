---
title: Translation
---

# Translation

Leo carries the translation machinery once; each application carries its own words. Leo's own components use the same machinery for their strings.

## Languages

[`src/languages.ts`](https://github.com/roola-xyz/leo/blob/main/src/languages.ts):

| Export | |
|---|---|
| `LANGUAGES` | The twelve offered languages as `{ tag, endonym }`: `en`, `es`, `fr`, `de`, `it`, `pt-BR`, `nl`, `pl`, `tr`, `ja`, `ko`, `zh-Hans` |
| `LocaleTag` | The union of those tags |
| `DEFAULT_LOCALE` | `"en"` |
| `isLocaleTag(value)` | Type guard |
| `LANGUAGE_OPTIONS` | `{ value, label }[]` for `LanguageSelect` |
| `preferredLocale(candidates)` | Best offered tag for a list such as `navigator.languages`: exact match first, then by language subtag (`fr-CA` → `fr`), else `en` |

Endonyms are used so people find their language written in it. All twelve are left-to-right; right-to-left languages would need the components' physical utilities (`ml-auto`, `right-0`) converted to logical ones first. The same list must be kept in step with the backend's list of accepted locales.

## The page's locale

`LocaleProvider({ initial?, children })` holds the current `LocaleTag` for everything beneath it.

- Initial value: `initial`, else `cachedLocale()` — the last choice stored in `localStorage` under `roola.locale`, else `preferredLocale(navigator.languages)`.
- Setting the locale writes `roola.locale` and `document.documentElement.lang` immediately (before re-render, so the first request made under the new locale already carries it). `<html lang>` is also set at module load.
- `useLocale()` returns the locale, or `en` outside a provider — nothing in Leo needs to be wrapped to render.
- `localeHeaders()` returns `{ "Accept-Language": cachedLocale() }`. Send it on every API request so server-side validation messages come back in the language of the form.

`useLocalePreference(persist)` (see [Components](Components.md)) is the hook an account menu uses to show and change the preference and save it to the server.

## An application's catalogue

```ts
// src/i18n.ts
import { createTranslations } from "@roola/leo";
import en from "./locales/en";

export const { I18nProvider, useTranslations, translate } = createTranslations({
  en,                                   // the full set, and the type
  es: () => import("./locales/es"),     // loaded on demand
  fr: () => import("./locales/fr"),
  // … one per tag in LANGUAGES
});
```

```ts
// src/locales/en.ts
const en = {
  "home.title": "Welcome",
  "home.results": "{count, plural, =0 {No results} one {# result} other {# results}}",
  "home.intro": "Read the <link>help article</link> first.",
};
export default en;
```

Other languages are typed against English (`Catalogue<M>`), so a missing key is a compile error. A language may be given as an object (available immediately) or a loader returning the module or `{ default }`.

`createTranslations` returns:

| Name | |
|---|---|
| `I18nProvider({ initial?, fallback?, children })` | A `LocaleProvider` with a `TranslationsProvider` inside. Wrap the app root once |
| `TranslationsProvider({ fallback?, children })` | Just the catalogue layer, for an app that already has a `LocaleProvider` |
| `useTranslations()` | `{ locale, t, rich, has, …formatters }` |
| `translate(key, values?)` | `t` for code outside components, in the language currently shown |
| `load(locale)` | Preload a language |

On a language change the old catalogue stays on screen until the new one has loaded. A loader that fails falls back to English. A missing key falls back to the English message, then to the key itself.

```tsx
const { t, rich, date, number } = useTranslations();
<h1>{t("home.title")}</h1>
<p>{t("home.results", { count: 3 })}</p>
<p>{rich("home.intro", { link: (chunks) => <a href="/help">{chunks}</a> })}</p>
```

## Message syntax

A subset of ICU MessageFormat, parsed by `parse()` and rendered by `format()` with `toString()` or `toNodes()` (all exported, for a library that bundles its own catalogue):

| Form | Example |
|---|---|
| Placeholder | `Hello, {name}.` |
| Plural | `{count, plural, =0 {None} one {# item} other {# items}}` — categories from `Intl.PluralRules`; `#` is the locale-formatted number |
| Select | `{status, select, open {Open} closed {Closed} other {Unknown}}` |
| Tags | `Read the <link>help</link>.` — the value for `link` is a function of the children; use `rich()` to get React nodes |
| Quoting | `'{'` is a literal brace, `''` a literal apostrophe; an apostrophe before a letter (`it's`, `l'application`) is just an apostrophe |

## Formatters

`useFormatters()` (and every `useTranslations()` result) gives locale-aware `Intl` helpers, cached per locale:

| Function | Example output |
|---|---|
| `date(value, options?)` | 12 Sept 2026 |
| `dateTime(value, options?)` | 12 Sept 2026, 14:05 |
| `time(value, options?)` | 14:05 |
| `number(value, options?)` | 1,234 |
| `compact(value)` | 1.2K |
| `percent(fraction, options?)` | 12% |
| `currency(value, code, options?)` | £12.00 |
| `relative(value, now?)` | 3 days ago |
| `list(items, type?)` | Ada, Grace and Linus |

`formatters(locale)` is the non-hook form.

## Leo's own words

`useLeoTranslations()` returns `{ locale, t, rich }` over Leo's bundled catalogue in [`src/i18n/messages/`](https://github.com/roola-xyz/leo/tree/main/src/i18n/messages) — about fifty keys in twelve languages, grouped `menu.*`, `theme.*`, `apps.*`, `report.*`, `verification.*`, `waiting.*`. They are bundled rather than lazy-loaded so components render correctly anywhere, including stories and tests. `LeoMessages` is the type, from `messages/en.ts`; every other language file must satisfy it.

When adding a string to a Leo component, add the key to `en.ts` and to all eleven other files.

---

- [Home](index.md)
- [Getting started](Getting-started.md)
- [Architecture](Architecture.md)
- [Components](Components.md)
- [Theming](Theming.md)
- [Translation](Translation.md)
- [Contributing](Contributing.md)
