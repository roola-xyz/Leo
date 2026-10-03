import { useMemo } from "react";
import { useLocale } from "./LocaleProvider";

/**
 * Dates, numbers and lists in the language of the page.
 *
 * Every product had its own `toLocaleDateString("en-GB")` and its own
 * "3 days ago"; this is those, once, driven by the same locale the words are.
 * Nothing here is clever: it is `Intl`, with the options each kind of value
 * usually wants filled in, so a component asks for `date(value)` rather than
 * remembering which four options make a medium date.
 */
export interface Formatters {
  locale: string;
  /** "12 Sept 2026" — a medium date, the everyday one. */
  date: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  /** "12 Sept 2026, 14:05". */
  dateTime: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  /** "14:05". */
  time: (value: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  /** "1,234" or "1.234", as the language writes it. */
  number: (value: number, options?: Intl.NumberFormatOptions) => string;
  /** "1.2K", "3.4M" — for counts beside a thing, where the exact figure is not the point. */
  compact: (value: number) => string;
  /** "12%". `value` is a fraction: 0.12. */
  percent: (value: number, options?: Intl.NumberFormatOptions) => string;
  /** "£12.00", "12,00 €". Minor units are the caller's business; pass the major amount. */
  currency: (value: number, currency: string, options?: Intl.NumberFormatOptions) => string;
  /** "3 days ago", "in 2 hours", "yesterday" — for the moment given, relative to now. */
  relative: (value: Date | string | number, now?: Date) => string;
  /** "Ada, Grace and Linus". */
  list: (items: string[], type?: "conjunction" | "disjunction") => string;
}

function toDate(value: Date | string | number): Date {
  return value instanceof Date ? value : new Date(value);
}

const cache = new Map<string, Formatters>();

export function formatters(locale: string): Formatters {
  let existing = cache.get(locale);

  if (existing) return existing;

  const relativeFormat = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  existing = {
    locale,

    date: (value, options) =>
      new Intl.DateTimeFormat(locale, options ?? { dateStyle: "medium" }).format(toDate(value)),

    dateTime: (value, options) =>
      new Intl.DateTimeFormat(locale, options ?? { dateStyle: "medium", timeStyle: "short" }).format(
        toDate(value),
      ),

    time: (value, options) =>
      new Intl.DateTimeFormat(locale, options ?? { timeStyle: "short" }).format(toDate(value)),

    number: (value, options) => new Intl.NumberFormat(locale, options).format(value),

    compact: (value) =>
      new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(value),

    percent: (value, options) =>
      new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0, ...options }).format(
        value,
      ),

    currency: (value, currency, options) =>
      new Intl.NumberFormat(locale, { style: "currency", currency, ...options }).format(value),

    relative: (value, now = new Date()) => {
      const seconds = Math.round((toDate(value).getTime() - now.getTime()) / 1000);
      const absolute = Math.abs(seconds);

      // The largest unit that is at least one of itself, the way people say it.
      if (absolute < 45) return relativeFormat.format(0, "second");
      if (absolute < 60 * 45) return relativeFormat.format(Math.round(seconds / 60), "minute");
      if (absolute < 60 * 60 * 22) return relativeFormat.format(Math.round(seconds / 3600), "hour");
      if (absolute < 60 * 60 * 24 * 26) return relativeFormat.format(Math.round(seconds / 86400), "day");
      if (absolute < 60 * 60 * 24 * 320) return relativeFormat.format(Math.round(seconds / (86400 * 30.4)), "month");

      return relativeFormat.format(Math.round(seconds / (86400 * 365)), "year");
    },

    list: (items, type = "conjunction") => new Intl.ListFormat(locale, { type }).format(items),
  };

  cache.set(locale, existing);

  return existing;
}

/** The formatters for the language of the page. */
export function useFormatters(): Formatters {
  const locale = useLocale();

  return useMemo(() => formatters(locale), [locale]);
}
