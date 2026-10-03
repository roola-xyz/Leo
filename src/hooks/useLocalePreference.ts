import { useCallback, useState } from "react";
import { isLocaleTag, type LocaleTag } from "../languages";
import { cachedLocale, useLocaleSetter } from "../i18n/LocaleProvider";

/**
 * The language preference, as the account menu shows and changes it.
 *
 * The account holds the real preference and it arrives with the session; until
 * then the last choice made on this machine stands in, so the picker does not
 * flick from English to the right answer a moment after the page paints.
 *
 * The value lives in the `LocaleProvider` above the application, so changing
 * it here changes the language of everything on the page, not only the row in
 * the menu. Rendered without a provider — a story, say — the hook keeps the
 * choice to itself and nothing else follows it.
 */
export function useLocalePreference(persist: (locale: LocaleTag) => Promise<unknown>) {
  const provider = useLocaleSetter();
  const [own, setOwn] = useState<LocaleTag>(cachedLocale);

  const locale = provider?.locale ?? own;
  const set = provider?.setLocale ?? setOwn;

  /** Adopt the value the server sent with the session. */
  const adopt = useCallback(
    (stored: string | null | undefined) => {
      if (isLocaleTag(stored)) set(stored);
    },
    [set],
  );

  /**
   * Change the language: applied immediately, saved in the background. Nobody
   * should watch a spinner to change a language.
   */
  const change = useCallback(
    (next: LocaleTag) => {
      set(next);
      void persist(next).catch(() => undefined);
    },
    [persist, set],
  );

  return { locale, adopt, change };
}
