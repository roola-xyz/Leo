/*
 * Translation for the estate: the locale a page is in, the message syntax
 * every catalogue is written in, and the hooks an application builds its own
 * catalogue into. Leo's components use the same machinery for their own words.
 */

export { LocaleProvider, useLocale, cachedLocale, localeHeaders } from "./LocaleProvider";
export {
  createTranslations,
  type Catalogue,
  type Translations,
  type TranslationsProviderProps,
} from "./createTranslations";
export { formatters, useFormatters, type Formatters } from "./intl";
export { parse, format, toString, toNodes, type Values, type Value } from "./format";
export { useLeoTranslations, type LeoKey } from "./messages";
export type { LeoMessages } from "./messages/en";
