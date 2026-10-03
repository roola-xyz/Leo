---
title: Components
---

# Components

Everything below is exported from `@roola/leo`. Each component lives in `src/components/<Name>/index.tsx` with a Storybook file beside it; the [live Storybook](https://roola-xyz.github.io/Leo/) shows every state in light and dark. Props listed are the component's own; components marked *extends* also accept the native element's attributes.

## Primitives

| Component | Props | Notes |
|---|---|---|
| [`Button`](https://github.com/roola-xyz/leo/blob/main/src/components/Button/index.tsx) | `variant?: "filled" \| "tonal" \| "outlined" \| "text"` (default `filled`), `loading?`, `icon?: ReactNode`, `children`; extends `<button>` | Fully rounded, M3 state layers |
| [`IconButton`](https://github.com/roola-xyz/leo/blob/main/src/components/IconButton/index.tsx) | `icon: IconName`, `label` (accessible name), `size?: "sm" \| "md"`, `active?`; extends `<button>` | |
| [`Card`](https://github.com/roola-xyz/leo/blob/main/src/components/Card/index.tsx), `CardHeader`, `CardBody` | `Card`/`CardBody`: `className?`, `children`; `CardHeader`: `title`, `description?` | `rounded-card` corners |
| [`Field`](https://github.com/roola-xyz/leo/blob/main/src/components/Field/index.tsx) | `label`, `error?`, `hint?`; extends `<input>` | The input is `aria-describedby` its error and hint, `aria-invalid` with an error |
| [`TextArea`](https://github.com/roola-xyz/leo/blob/main/src/components/TextArea/index.tsx) | `label`, `error?`, `hint?`, `rows?` (6); extends `<textarea>` | |
| [`Select`](https://github.com/roola-xyz/leo/blob/main/src/components/Select/index.tsx) | `label`, `options: {value, label}[]`, `placeholder?`, `error?`, `hint?`; extends `<select>` | Native select |
| [`LanguageSelect`](https://github.com/roola-xyz/leo/blob/main/src/components/LanguageSelect/index.tsx) | `value`, `options: readonly LanguageOption[]`, `onChange(value)`, `label`, `className?` | Pass `LANGUAGE_OPTIONS` |
| [`Chip`](https://github.com/roola-xyz/leo/blob/main/src/components/Chip/index.tsx) | `selected?`, `onClick?`, `children` | Filter chip, rendered as `role="radio"`; put a set inside a `radiogroup` |
| [`Alert`](https://github.com/roola-xyz/leo/blob/main/src/components/Alert/index.tsx) | `tone?: "info" \| "success" \| "warning" \| "error"`, `children` | |
| [`Badge`](https://github.com/roola-xyz/leo/blob/main/src/components/Badge/index.tsx) | `tone?: "neutral" \| "green" \| "red" \| "amber" \| "blue"`, `children` | |
| [`Avatar`](https://github.com/roola-xyz/leo/blob/main/src/components/Avatar/index.tsx) | `name`, `handle?`, `src?`, `size?: "xs" \| "sm" \| "md" \| "ml" \| "lg"` (`sm`), `className?` | Falls back to a coloured initial seeded by `handle` (or `name`). Remembers *which* `src` failed, so a new `src` is tried again |
| [`Icon`](https://github.com/roola-xyz/leo/blob/main/src/components/Icon/index.tsx) | `name: IconName`, `filled?`, `className?` | Inline SVG paths, no icon font. `IconName` is the union of keys in the file (navigation, media player, social, category and settings glyphs) |
| [`Menu`](https://github.com/roola-xyz/leo/blob/main/src/components/Menu/index.tsx), `MenuItem`, `MenuLabel`, `MenuSeparator` | `Menu`: `trigger`, `align?: "start" \| "end"`, `children` (node, or `(close) => node`), `className?`. `MenuItem`: `icon?`, `href?`, `target?`, `rel?`, `onClick?`, `selected?`, `danger?` | Escape closes and returns focus; outside click closes; `aria-expanded`/`aria-haspopup` on the trigger. No arrow-key roving — Tab walks the items |
| [`ThemeToggle`](https://github.com/roola-xyz/leo/blob/main/src/components/ThemeToggle/index.tsx) | `value: Theme`, `onChange(theme)` | Segmented `system` / `light` / `dark`. Applying the choice (the `dark` class) is the application's job |
| [`Skeleton`](https://github.com/roola-xyz/leo/blob/main/src/components/Skeleton/index.tsx) | `className?` | Size it with classes |
| [`Spinner`](https://github.com/roola-xyz/leo/blob/main/src/components/Spinner/index.tsx) | `label?` ("Loading"), `className?` | |

## Figures

| Component | Props | Notes |
|---|---|---|
| [`Chart`](https://github.com/roola-xyz/leo/blob/main/src/components/Chart/index.tsx) | `labels: string[]`, `series: ChartSeries[]` (`{label, values}`), `kind?: "line" \| "bar"`, `area?`, `height?`, `format?(n)`, `formatLabel?(label)`, `empty?`, `labels` for its own words (`ChartLabels`) | Hand-drawn SVG, width follows the container. Four series slots drawn from theme tokens. ISO date labels shortened to "6 Sep". A toggle swaps the plot for a table |
| [`Stat`](https://github.com/roola-xyz/leo/blob/main/src/components/Stat/index.tsx) | `label`, `value: ReactNode`, `note?`, `tone?: "plain" \| "good" \| "warn" \| "bad"`, `spark?: number[]`, `loading?`, `action?(tile)`, `className?` | One headline figure with an optional sparkline; `action` wraps the tile, e.g. in a link |

## Panels

The sheet that drops from an app bar, shared by `UserMenu` and `AppsMenu` so the two read as one panel.

| Component | Props |
|---|---|
| [`PanelSurface`](https://github.com/roola-xyz/leo/blob/main/src/components/Panel/index.tsx) | `label` (accessible name), `className?`, `children` — absolutely positioned, rounded, `bg-surface-low` |
| `PanelTopLine` | `onClose`, `closeLabel`, `children?` — centred title with a close button on the right |
| `PanelGroup` | `role?`, `label?`, `className?`, `children` — a card of rows divided by hairlines |

## Composites

### `UserMenu`

The account menu for an app bar: avatar trigger, then a panel with an optional "Managed by {organisation}" line, an identity card, a "Manage your account" row, Appearance and Language rows that open in-panel lists (Escape steps back before it closes), the product's own rows, sign out, and policy links at the foot.

| Prop | Type | |
|---|---|---|
| `user` | `UserMenuUser` — `name`, `email`, `image?`, `reference?` (monospace line), `caption?` | required |
| `theme`, `onThemeChange` | `Theme`, `(theme) => void` | required |
| `onSignOut` | `() => void` | required |
| `locale`, `onLocaleChange` | `LocaleTag`, `(locale) => void` | both or neither; omitted, the Language row is not drawn |
| `organisation` | `UserMenuOrganisation` — `name`, `image?`, `url?`, `linkLabel?` | optional |
| `accountUrl` | `string` | where "Manage your account" goes; omitted, no row |
| `items` | `(close) => ReactNode` | product rows as `UserMenuItem`s |
| `children` | `ReactNode` | extra settings rows as `UserMenuRow`s |
| `policiesUrl` | `string` | adds `{policiesUrl}/privacy-policy` and `{policiesUrl}/terms-of-service` to the foot |
| `links` | `UserMenuLink[]` (`{label, href}`) | further foot links |
| `labels` | `Partial<UserMenuLabels>` | override any of Leo's own wording |
| `panelClassName` | `string` | e.g. `surface-scheme` when the header redefines colour roles |

`UserMenuItem` takes `icon?`, `href?` (rendered as `<a>`, not a router link), `onClick?`, `value?` (shown on the right), `selected?` (`false` is meaningful: "one of a set, not this one"), `opens?`, `emphasis?`. `UserMenuRow` takes `label` and a control as children.

### `AppsMenu` and `AppIcon`

A launcher in the style of Google's: a "favourites" card with an edit mode (add, remove, drag or arrow-key reorder) and every other app below.

- Props: `accountsUrl` (base URL of the service that lists apps), `panelClassName?`.
- Fetches `GET {accountsUrl}/api/apps` the first time it is opened, expecting `{ apps: [{ name, description, url, icon }] }`. Shown signed out too.
- Favourites are per browser, in `localStorage` under `roola.apps.favourites` (ordered names). Until a choice is made, the first six apps are favourites.
- `AppIcon({ name, className? })` draws a launcher mark by name, for a product list elsewhere.

### `WaitingList`, `PlatformGate`, `joinThroughAccounts`

What an application shows while it is closed to the public.

- `PlatformStatus`: `name`, `open`, `waiting_list`, `since`, `message`, `join_url?`.
- `PlatformGate({ fetchStatus, onJoin, source?, logo?, tagline?, landing?, children })` calls `fetchStatus()` once on mount and renders nothing until it answers. If `status.waiting_list` is true it renders the waiting list instead of `children`; otherwise `children`. If the fetch fails it fails open — the gate is a courtesy, and the backend must refuse requests itself while closed. When `status.join_url` is set, joining goes through `joinThroughAccounts` rather than `onJoin`.
- `landing` is a same-origin URL of a full-page landing page, drawn in a full-screen `<iframe>` in place of the plain list. The page must mark its `<html>` with `data-landing`, or the gate falls back to the plain list; the gate exposes `window.roolaWaitingList = { join(email), message }` for the page's own form to call.
- `WaitingList({ status, onJoin, source?, logo?, tagline? })` — the page itself. With `status.join_url` set, joining means registering an account there; otherwise the email and name go to `onJoin`, which resolves on success or throws with a message.
- `joinThroughAccounts(joinUrl, { email?, source? })` navigates the window to `joinUrl` with those as query parameters, and returns a promise that never resolves.

### `ReportDialog`

A dialog for reporting a piece of content. Props: `heading`, `doneHeading?`, `subject?`, `prompt` (the question, for screen readers), `reasons: ReportReason[] | null` (`null` while loading; `{value, label}`), `reasonsError?`, `noteLabel?`, `notePlaceholder?`, `submitLabel?`, `onSubmit(reason, note) => Promise<string>` (resolves to the one sentence shown afterwards), `onClose`, `children?`. A reason must be chosen from the list; the reply is the same whatever happened server-side.

### `VerificationToast`

Prompts a user to approve or deny an identity check raised by a support agent during a call. Props: `verification: Verification` (`uid`, `agent_name`, `reason`, `challenge`, `expires_at`, `seconds_remaining`), `onApprove(uid)`, `onDeny(uid)` (either may return a promise; the button shows a spinner until it settles), `onLapse(uid)` when the countdown ends. The challenge number is shown so the user can check it matches what the caller reads aloud.

### `PushSwitch`

A notifications switch with its explanatory sentence, over `usePush`. Props: `publicKey` (VAPID), `available` (the product has push configured), `api: PushApi`, `title?`, `describes` (what will be sent), `labels?`. Draws a switch only in the `off` and `on` states and a sentence for `unsupported`, `unavailable` and `blocked`.

## Hooks

| Hook | Signature | |
|---|---|---|
| `useScrolled` | `(threshold = 0) => boolean` | Passive scroll listener, for giving a translucent app bar an edge |
| `useLocalePreference` | `(persist: (locale) => Promise<unknown>) => { locale, adopt, change }` | `adopt(stored)` takes the server's value; `change(next)` applies at once and saves in the background. Uses the `LocaleProvider` if present |
| `usePush` | `(publicKey, available, api, workerPath = "/sw.js") => { state, working, enable, disable }` | `state: "unsupported" \| "unavailable" \| "blocked" \| "off" \| "on"`. `PushApi` is `subscribe({endpoint, public_key, auth_token})` and `unsubscribe(endpoint)` |
| `useFormatters`, `useLeoTranslations` | | See [Translation](Translation.md) |

## Utilities

`cn(...classes)` joins truthy class names. It does not resolve conflicting Tailwind utilities.

---

- [Home](index.md)
- [Getting started](Getting-started.md)
- [Architecture](Architecture.md)
- [Components](Components.md)
- [Theming](Theming.md)
- [Translation](Translation.md)
- [Contributing](Contributing.md)
