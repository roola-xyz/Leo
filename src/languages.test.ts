import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, LANGUAGE_OPTIONS, LANGUAGES, isLocaleTag, preferredLocale } from "./languages";

describe("languages", () => {
  it("offers every language as an option named in itself", () => {
    expect(LANGUAGE_OPTIONS).toHaveLength(LANGUAGES.length);
    expect(LANGUAGE_OPTIONS).toContainEqual({ value: "de", label: "Deutsch" });
  });

  it("knows which tags it offers", () => {
    expect(isLocaleTag("pt-BR")).toBe(true);
    expect(isLocaleTag("pt")).toBe(false);
    expect(isLocaleTag(null)).toBe(false);
  });

  it("prefers the exact tag, whatever its case", () => {
    expect(preferredLocale(["PT-br"])).toBe("pt-BR");
  });

  it("falls back to the language part when the region is not offered", () => {
    expect(preferredLocale(["fr-CA"])).toBe("fr");
    expect(preferredLocale(["zh-TW"])).toBe("zh-Hans");
  });

  it("takes the first candidate it can serve", () => {
    expect(preferredLocale(["xx", "ja-JP", "de"])).toBe("ja");
  });

  it("is English when nothing matches", () => {
    expect(preferredLocale(["xx-YY"])).toBe(DEFAULT_LOCALE);
    expect(preferredLocale([])).toBe("en");
  });
});
