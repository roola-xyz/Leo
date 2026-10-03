import {
  Fragment,
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, type LocaleTag } from "../languages";
import { format, parse, toNodes, toString, type Values } from "./format";
import { formatters, type Formatters } from "./intl";
import { LocaleProvider, useLocale } from "./LocaleProvider";

/**
 * A catalogue: every message the application says, keyed by a stable name.
 *
 * English is the full set and the type; every other language is checked
 * against it, so a missing translation is a compile error rather than a blank
 * label. The other languages are loaded on demand — `() => import("./es")` —
 * so a page in Polish downloads Polish and nothing else.
 */
export type Catalogue<M extends Record<string, string>> = {
  en: M;
} & Partial<Record<Exclude<LocaleTag, "en">, M | (() => Promise<M | { default: M }>)>>;

/** What a component gets back: the words, and the numbers and dates to go with them. */
export interface Translations<M extends Record<string, string>> extends Formatters {
  locale: LocaleTag;
  /** The message as a string, with its placeholders filled. */
  t: (key: keyof M & string, values?: Values) => string;
  /** The message as React children, so a `<link>` in it can become a real one. */
  rich: (key: keyof M & string, values?: Values) => ReactNode;
  /** Whether a key exists — for a message chosen by a value from the server. */
  has: (key: string) => key is keyof M & string;
}

export interface TranslationsProviderProps {
  /** Drawn while a language other than English is still on its way; nothing, by default. */
  fallback?: ReactNode;
  children: ReactNode;
}

function makeTranslations<M extends Record<string, string>>(
  locale: LocaleTag,
  messages: M,
  english: M,
): Translations<M> {
  const lookup = (key: string): string => messages[key] ?? english[key] ?? key;

  return {
    ...formatters(locale),
    locale,

    t: (key, values = {}) => toString(format(parse(lookup(key)), values, locale)),

    rich: (key, values = {}) => {
      const nodes = toNodes(format(parse(lookup(key)), values, locale));

      // Keyed by position: the list is stable for a given message, and this
      // keeps React from warning about children in an array.
      return nodes.map((node, index) => createElement(Fragment, { key: index }, node));
    },

    has: (key): key is keyof M & string => key in english,
  };
}

/**
 * Builds the application's translation hooks around its catalogue.
 *
 *   // src/i18n.ts
 *   import en from "./locales/en";
 *   export const { I18nProvider, useTranslations, translate } = createTranslations({
 *     en,
 *     es: () => import("./locales/es"),
 *     …
 *   });
 *
 *   // src/main.tsx
 *   <I18nProvider><App /></I18nProvider>
 *
 *   // anywhere under it
 *   const { t } = useTranslations();
 *   <h1>{t("home.title")}</h1>
 *
 * The provider holds the `LocaleProvider` as well, so an application wraps
 * once. Changing the language loads the new catalogue and keeps showing the
 * old one until it is there, which is a moment, rather than showing English
 * in between.
 */
export function createTranslations<M extends Record<string, string>>(catalogue: Catalogue<M>) {
  const english = catalogue.en;
  const loaded = new Map<LocaleTag, M>([[DEFAULT_LOCALE, english]]);
  const loading = new Map<LocaleTag, Promise<M>>();

  function ready(locale: LocaleTag): M | undefined {
    const known = loaded.get(locale);

    if (known) return known;

    const source = catalogue[locale as Exclude<LocaleTag, "en">];

    // Given as an object rather than a loader: available at once.
    if (source && typeof source !== "function") {
      loaded.set(locale, source);
      return source;
    }

    return undefined;
  }

  function load(locale: LocaleTag): Promise<M> {
    const known = ready(locale);

    if (known) return Promise.resolve(known);

    let pending = loading.get(locale);

    if (!pending) {
      const source = catalogue[locale as Exclude<LocaleTag, "en">];

      pending = (typeof source === "function" ? source() : Promise.resolve(english))
        .then((module) => {
          const messages = "default" in module ? (module.default as M) : (module as M);
          loaded.set(locale, messages);
          return messages;
        })
        // A language that failed to arrive reads as English rather than as
        // nothing: the fallback is what a translated page would show for a
        // missing key anyway.
        .catch(() => english)
        .finally(() => loading.delete(locale));

      loading.set(locale, pending);
    }

    return pending;
  }

  interface Active {
    locale: LocaleTag;
    messages: M;
  }

  // What code outside React — an API client composing an error — should say.
  // Kept in step with the provider; English until there is one.
  let current: Active = { locale: DEFAULT_LOCALE, messages: english };

  const Context = createContext<Active>(current);

  function TranslationsProvider({ fallback = null, children }: TranslationsProviderProps) {
    const locale = useLocale();

    const [active, setActive] = useState<Active | null>(() => {
      const messages = ready(locale);

      return messages ? { locale, messages } : null;
    });

    useEffect(() => {
      let cancelled = false;

      void load(locale).then((messages) => {
        if (!cancelled) setActive({ locale, messages });
      });

      return () => {
        cancelled = true;
      };
    }, [locale]);

    useEffect(() => {
      if (active) current = active;
    }, [active]);

    if (!active) return fallback;

    return createElement(Context.Provider, { value: active }, children);
  }

  function I18nProvider({ initial, ...props }: TranslationsProviderProps & { initial?: LocaleTag }) {
    return createElement(
      LocaleProvider,
      { initial, children: createElement(TranslationsProvider, props) },
    );
  }

  function useTranslations(): Translations<M> {
    const { locale, messages } = useContext(Context);

    return useMemo(() => makeTranslations(locale, messages, english), [locale, messages]);
  }

  /** The message in the language currently shown, for code that is not a component. */
  function translate(key: keyof M & string, values: Values = {}): string {
    return makeTranslations(current.locale, current.messages, english).t(key, values);
  }

  return { I18nProvider, TranslationsProvider, useTranslations, translate, load };
}
