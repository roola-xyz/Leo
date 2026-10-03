import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, isLocaleTag, preferredLocale, type LocaleTag } from "../languages";

/**
 * Which language the page is in, for everything on it.
 *
 * The account holds the real preference and it arrives with the session; until
 * then the last choice made on this machine stands in, and on a machine that
 * has never chosen, the browser's own list. The key is the same on every Roola
 * site on purpose — it is one preference, and somebody who chose a language on
 * the sign-in page should find every other site already in it.
 */
const CACHE_KEY = "roola.locale";

/** The locale this browser last saw, or the best guess for one that never has. */
export function cachedLocale(): LocaleTag {
  try {
    const stored = localStorage.getItem(CACHE_KEY);

    if (isLocaleTag(stored)) return stored;
  } catch {
    // Storage can be unavailable; the browser's preference is a fine answer.
  }

  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  return preferredLocale(navigator.languages ?? [navigator.language ?? DEFAULT_LOCALE]);
}

function remember(locale: LocaleTag): void {
  try {
    localStorage.setItem(CACHE_KEY, locale);
  } catch {
    // As above.
  }
}

/**
 * Tells the browser what language the page is in.
 *
 * Not decoration: it is what a screen reader picks a voice from, and what
 * decides whether a browser offers to translate the page. Getting it wrong
 * means a French page read aloud in an English accent.
 */
function apply(locale: LocaleTag): void {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
}

// Applied at module load, before React renders, for the same reason a theme is.
apply(cachedLocale());

/**
 * What every request to a Roola backend should carry.
 *
 * The browser's own Accept-Language says what the machine speaks, not what
 * the person chose in the account menu; sending the choice explicitly is how
 * a validation message comes back in the same language as the form it is
 * about. One exact tag, so the server has nothing to negotiate.
 */
export function localeHeaders(): Record<string, string> {
  return { "Accept-Language": cachedLocale() };
}

interface LocaleContextValue {
  locale: LocaleTag;
  setLocale: (locale: LocaleTag) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Holds the language for the application under it.
 *
 * One of these at the root, above everything that reads or shows words: the
 * catalogues follow it, `<html lang>` follows it, and the account menu's picker
 * changes it. Leo's own components read it too, so they are in the same
 * language as the page they sit on without being told.
 */
export function LocaleProvider({
  initial,
  children,
}: {
  /** Overrides the cached choice — for a story, or a test. */
  initial?: LocaleTag;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<LocaleTag>(() => initial ?? cachedLocale());

  /*
   * Remembered as it is set, not after the render: a change of language
   * remounts what is under the provider, and a child's effect — the first
   * request it makes — runs before this provider's own. Written only in
   * the effect, the cached locale that `localeHeaders()` sends was still
   * the old one for that request, and the answer came back in the
   * language just left.
   */
  const setLocale = useCallback((next: LocaleTag) => {
    remember(next);
    apply(next);
    setLocaleState(next);
  }, []);

  useEffect(() => {
    apply(locale);
    remember(locale);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/**
 * The language in force, for anything that formats or shows words.
 *
 * Outside a `LocaleProvider` — a story, a component rendered on its own — it is
 * English, so nothing here ever depends on being wrapped to render at all.
 */
export function useLocale(): LocaleTag {
  return useContext(LocaleContext)?.locale ?? DEFAULT_LOCALE;
}

/** The provider's setter, or null outside one. For the preference hook only. */
export function useLocaleSetter(): LocaleContextValue | null {
  return useContext(LocaleContext);
}
