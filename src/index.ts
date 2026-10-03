/*
 * Leo — the Roola design system.
 *
 * Everything an application in the estate shares: the Material 3 primitives,
 * the handful of composites that every product carries (the account menu, the
 * apps launcher, the identity-check toast, the report dialog) and the hooks
 * they lean on. The theme itself is CSS, imported separately — see theme.css.
 *
 * What is *not* here, on purpose: a product's own marks, its feature
 * components, and anything whose look is a decision that product made for
 * itself rather than one the estate made once.
 */

export { cn } from "./cn";
export {
  DEFAULT_LOCALE,
  LANGUAGES,
  LANGUAGE_OPTIONS,
  isLocaleTag,
  preferredLocale,
  type LocaleTag,
} from "./languages";

// Translation: the locale of the page, and the catalogue machinery every
// application builds on. See i18n/index.ts.
export {
  LocaleProvider,
  useLocale,
  cachedLocale,
  localeHeaders,
  createTranslations,
  formatters,
  useFormatters,
  useLeoTranslations,
  // The message syntax itself, for a library that bundles its own catalogue
  // the way Leo does — see useLeoTranslations.
  parse,
  format,
  toString,
  toNodes,
  type Catalogue,
  type Translations,
  type TranslationsProviderProps,
  type Formatters,
  type Values,
  type Value,
  type LeoMessages,
} from "./i18n";

// Primitives
export { Alert } from "./components/Alert";
export { Avatar } from "./components/Avatar";
export { Badge } from "./components/Badge";
export { Button } from "./components/Button";
export { Card, CardHeader, CardBody } from "./components/Card";
export { Chart, type ChartSeries, type ChartLabels } from "./components/Chart";
export { Chip } from "./components/Chip";
export { Field } from "./components/Field";
export { Icon, type IconName } from "./components/Icon";
export { IconButton } from "./components/IconButton";
export { LanguageSelect, type LanguageOption } from "./components/LanguageSelect";
export { Menu, MenuItem, MenuLabel, MenuSeparator } from "./components/Menu";
export { Select } from "./components/Select";
export { Skeleton } from "./components/Skeleton";
export { Spinner } from "./components/Spinner";
export { Stat } from "./components/Stat";
export { TextArea } from "./components/TextArea";
export { ThemeToggle, type Theme } from "./components/ThemeToggle";

// Composites
export { AppsMenu, AppIcon } from "./components/AppsMenu";
export { PanelSurface, PanelTopLine, PanelGroup } from "./components/Panel";
export { ReportDialog, type ReportReason } from "./components/ReportDialog";
export {
  UserMenu,
  UserMenuItem,
  UserMenuRow,
  type UserMenuLabels,
  type UserMenuLink,
  type UserMenuOrganisation,
  type UserMenuUser,
} from "./components/UserMenu";
export { VerificationToast, type Verification } from "./components/VerificationToast";
export { WaitingList, PlatformGate, type PlatformStatus } from "./components/WaitingList";
export { PushSwitch } from "./components/PushSwitch";

// Hooks
export { useLocalePreference } from "./hooks/useLocalePreference";
export { useScrolled } from "./hooks/useScrolled";
export { usePush, type PushState, type PushApi } from "./hooks/usePush";
