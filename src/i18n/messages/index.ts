import { Fragment, createElement, useMemo, type ReactNode } from "react";
import { type LocaleTag } from "../../languages";
import { useLocale } from "../LocaleProvider";
import { format, parse, toNodes, toString, type Values } from "../format";
import en, { type LeoMessages } from "./en";
import es from "./es";
import fr from "./fr";
import de from "./de";
import it from "./it";
import ptBR from "./pt-BR";
import nl from "./nl";
import pl from "./pl";
import tr from "./tr";
import ja from "./ja";
import ko from "./ko";
import zhHans from "./zh-Hans";

/**
 * Leo's own words, in every language the estate is offered in.
 *
 * Bundled rather than loaded on demand: a few dozen strings, and the
 * components that say them have to work wherever they are rendered — a story,
 * a test, an application that has not wrapped itself in anything — without
 * waiting for a request first.
 */
const MESSAGES: Record<LocaleTag, LeoMessages> = {
  en,
  es,
  fr,
  de,
  it,
  "pt-BR": ptBR,
  nl,
  pl,
  tr,
  ja,
  ko,
  "zh-Hans": zhHans,
};

export type LeoKey = keyof LeoMessages;

/**
 * The words for Leo's composites in the language of the page. Outside a
 * `LocaleProvider` they are English, so no component here needs wrapping.
 */
export function useLeoTranslations() {
  const locale = useLocale();

  return useMemo(() => {
    const messages = MESSAGES[locale] ?? en;

    return {
      locale,
      t: (key: LeoKey, values: Values = {}) => toString(format(parse(messages[key]), values, locale)),
      rich: (key: LeoKey, values: Values = {}): ReactNode =>
        toNodes(format(parse(messages[key]), values, locale)).map((node, index) =>
          createElement(Fragment, { key: index }, node),
        ),
    };
  }, [locale]);
}
