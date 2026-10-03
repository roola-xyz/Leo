/**
 * The languages the estate is offered in — the same list as accounts'
 * `App\Enums\Locale`, which is what validates a choice when it is saved.
 *
 * Here rather than in accounts' i18n because every account menu carries the
 * picker, not only the one on the translated site: the preference belongs to
 * the person and is saved to the account, so it should be reachable wherever
 * they happen to be. The list therefore has to be one list, and a product
 * that is not translated must still be able to name every language accounts
 * accepts.
 *
 * Endonyms, not English names: somebody looking for their language in this
 * list is, by definition, reading it in that language. "Deutsch" is findable
 * by a German speaker in a way "German" is not.
 */
export const LANGUAGES = [
  { tag: "en", endonym: "English" },
  { tag: "es", endonym: "Español" },
  { tag: "fr", endonym: "Français" },
  { tag: "de", endonym: "Deutsch" },
  { tag: "it", endonym: "Italiano" },
  { tag: "pt-BR", endonym: "Português (Brasil)" },
  { tag: "nl", endonym: "Nederlands" },
  { tag: "pl", endonym: "Polski" },
  { tag: "tr", endonym: "Türkçe" },
  { tag: "ja", endonym: "日本語" },
  { tag: "ko", endonym: "한국어" },
  { tag: "zh-Hans", endonym: "简体中文" },
] as const;

export type LocaleTag = (typeof LANGUAGES)[number]["tag"];

export const DEFAULT_LOCALE: LocaleTag = "en";

export function isLocaleTag(value: unknown): value is LocaleTag {
  return LANGUAGES.some((language) => language.tag === value);
}

/** The list in the shape `LanguageSelect` takes. */
export const LANGUAGE_OPTIONS = LANGUAGES.map((language) => ({
  value: language.tag,
  label: language.endonym,
}));

/**
 * The best offered language for a browser that has never chosen one.
 *
 * Matches the full tag first so `pt-BR` beats `pt`, then falls back to the
 * language part alone: somebody whose browser asks for `fr-CA` is better served
 * by French than by English.
 */
export function preferredLocale(candidates: readonly string[]): LocaleTag {
  for (const candidate of candidates) {
    const exact = LANGUAGES.find(
      (language) => language.tag.toLowerCase() === candidate.toLowerCase(),
    );

    if (exact) return exact.tag;

    const base = candidate.split("-")[0]?.toLowerCase();
    const loose = LANGUAGES.find((language) => language.tag.split("-")[0]!.toLowerCase() === base);

    if (loose) return loose.tag;
  }

  return DEFAULT_LOCALE;
}
