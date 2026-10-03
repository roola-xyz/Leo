---
title: Theming
---

# Theming

All of it is in [`src/theme.css`](https://github.com/roola-xyz/leo/blob/main/src/theme.css), imported once after Tailwind:

```css
@import "tailwindcss";
@import "@roola/leo/theme.css";
```

## Colour roles

Components reference Material 3 *roles*, never colours. Each role is a CSS variable defined on `:root` (light) and `.dark` (dark), and `@theme inline` exposes it to Tailwind under a shorter name, so `bg-primary`, `text-on-surface-variant`, `border-outline-variant` and so on all exist and switch with the scheme. The baseline values are Material 3's scheme with a royal purple source colour.

| Tailwind colour | Variable | Light | Dark |
|---|---|---|---|
| `primary` | `--md-primary` | `#5b3bbd` | `#cdbdff` |
| `on-primary` | `--md-on-primary` | `#ffffff` | `#331b6e` |
| `primary-container` | `--md-primary-container` | `#e6ddff` | `#4a2aa6` |
| `on-primary-container` | `--md-on-primary-container` | `#1e0060` | `#e6ddff` |
| `secondary-container` | `--md-secondary-container` | `#e9eef6` | `#282a2c` |
| `on-secondary-container` | `--md-on-secondary-container` | `#1f1f1f` | `#e3e3e3` |
| `surface` | `--md-surface` | `#ffffff` | `#131314` |
| `surface-low` | `--md-surface-container-low` | `#f8fafd` | `#1b1b1b` |
| `surface-container` | `--md-surface-container` | `#f0f4f9` | `#1e1f20` |
| `surface-high` | `--md-surface-container-high` | `#e9eef6` | `#282a2c` |
| `on-surface` | `--md-on-surface` | `#1f1f1f` | `#e3e3e3` |
| `on-surface-variant` | `--md-on-surface-variant` | `#444746` | `#c4c7c5` |
| `outline` | `--md-outline` | `#747775` | `#8e918f` |
| `outline-variant` | `--md-outline-variant` | `#c4c7c5` | `#444746` |
| `error`, `on-error`, `error-container`, `on-error-container` | `--md-error…` | `#b3261e` … | `#f2b8b5` … |
| `success`, `success-container`, `on-success-container` | `--md-success…` | `#146c2e` … | `#6dd58c` … |
| `warning`, `warning-container`, `on-warning-container` | `--md-warning…` | `#8f5000` … | `#ffb95c` … |
| `scrim` | `--md-scrim` | `#000000` | `#000000` |

Depth is shown by tone (the surface steps), not by shadow. Note that there is no `secondary`, `tertiary` or `on-success`/`on-warning` role; add one in your application if you need it (below).

Each block also sets `color-scheme`, so native controls — `<select>` drop-downs, scrollbars, date pickers — follow the scheme.

## Dark mode

Dark mode is a class, not a media query:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

The application puts `dark` on `<html>` from the stored preference, resolving "system" to light or dark itself (with `matchMedia("(prefers-color-scheme: dark)")`). Leo's `ThemeToggle` and the Appearance row in `UserMenu` only report the choice through `onChange`/`onThemeChange`. A class is used because a stored preference has to be able to override the operating system, and a media query cannot be overridden. Set the class before React renders to avoid a flash of the wrong scheme.

Storybook's dark-mode toolbar toggles the same `dark` class on `<html>`.

### `.surface-scheme`

Every role is also declared on `.surface-scheme` (light) and `.dark .surface-scheme` (dark). It is for one case: a header floating over a dark hero redefines the roles for its own subtree so its controls read against the image, and a menu opened from it must be a normal surface again. Give that panel `surface-scheme` — `UserMenu` and `AppsMenu` take it through `panelClassName`.

## Overriding tokens

Redeclare a variable on `:root` (and `.dark`) **after** the import. Same specificity, later in the cascade, so it wins; never edit `theme.css` to change a product's colour.

```css
@import "@roola/leo/theme.css";

:root {
  --md-primary: #0b57d0;
  --md-primary-container: #d3e3fd;
}
.dark {
  --md-primary: #a8c7fa;
  --md-primary-container: #0842a0;
}

/* A role Leo does not define, exposed to Tailwind the same way */
:root { --viz-1: #1a73e8; }
.dark { --viz-1: #8ab4f8; }
@theme inline { --color-viz-1: var(--viz-1); }
```

Composites such as `WaitingList` draw only from roles, so a product that sets its own primary gets them in its own colour.

## Shape

| Utility | Radius | Use |
|---|---|---|
| `rounded-card` | 1.75rem | Cards |
| `rounded-field` | 0.75rem | Inputs |
| `rounded-full` | | Buttons (used directly) |

## Type

`--font-sans` is `Roboto, "Helvetica Neue", system-ui, -apple-system, "Segoe UI", Arial, sans-serif`. No webfont is loaded: Roboto is used where installed and the system font otherwise. That avoids a blocking font request and any third-party request, and works offline. The `body` rule sets the font, `surface-low` background and `on-surface` text.

## Motion

Declared as theme animations, so they arrive as utilities. Gate every use with `motion-safe:`.

| Utility | Animation |
|---|---|
| `animate-arrive` | Fade and rise 1rem, 0.7s |
| `animate-drift`, `animate-drift-slow` | Slow translate-and-scale loop, 18s and 26s (reversed) |
| `animate-draw` | A stroke drawing itself; the path needs `pathLength="1"` |

---

- [Home](index.md)
- [Getting started](Getting-started.md)
- [Architecture](Architecture.md)
- [Components](Components.md)
- [Theming](Theming.md)
- [Translation](Translation.md)
- [Contributing](Contributing.md)
