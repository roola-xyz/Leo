import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatters, useFormatters } from "./intl";
import { LocaleProvider } from "./LocaleProvider";

const now = new Date(Date.UTC(2026, 8, 12, 12, 0, 0));
const ago = (seconds: number) => new Date(now.getTime() - seconds * 1000);

describe("formatters", () => {
  const english = formatters("en-GB");

  it("is made once per locale", () => {
    expect(formatters("en-GB")).toBe(english);
    expect(english.locale).toBe("en-GB");
  });

  it("formats dates and times with sensible defaults, or the options given", () => {
    expect(english.date(now)).toBe("12 Sept 2026");
    expect(english.date("2026-09-12T12:00:00Z", { year: "numeric", timeZone: "UTC" })).toBe("2026");
    expect(english.dateTime(now.getTime(), { dateStyle: "short", timeStyle: "short", timeZone: "UTC" })).toBe("12/09/2026, 12:00");
    expect(english.dateTime(now)).toContain("12 Sept 2026");
    expect(english.time(now, { timeStyle: "short", timeZone: "UTC" })).toBe("12:00");
    expect(english.time(now)).toMatch(/^\d\d:\d\d$/);
  });

  it("formats numbers as the language writes them", () => {
    expect(english.number(1234.5)).toBe("1,234.5");
    expect(formatters("de").number(1234.5)).toBe("1.234,5");
    expect(english.number(0.5, { style: "percent" })).toBe("50%");
    expect(english.compact(1234)).toBe("1.2K");
    expect(english.percent(0.123)).toBe("12%");
    expect(english.percent(0.125, { maximumFractionDigits: 1 })).toBe("12.5%");
    expect(english.currency(12, "GBP")).toBe("£12.00");
    expect(english.currency(12, "GBP", { minimumFractionDigits: 0 })).toBe("£12");
  });

  it("says how long ago, in the largest unit that fits", () => {
    expect(english.relative(ago(10), now)).toBe("now");
    expect(english.relative(ago(60 * 5), now)).toBe("5 minutes ago");
    expect(english.relative(ago(3600 * 3), now)).toBe("3 hours ago");
    expect(english.relative(ago(86400), now)).toBe("yesterday");
    expect(english.relative(new Date(now.getTime() + 86400 * 2000), now)).toBe("in 2 days");
    expect(english.relative(ago(86400 * 61), now)).toBe("2 months ago");
    expect(english.relative(ago(86400 * 365 * 2), now)).toBe("2 years ago");
  });

  it("measures from the present when no moment is given", () => {
    expect(english.relative(new Date())).toBe("now");
  });

  it("joins lists", () => {
    expect(english.list(["Ada", "Grace", "Linus"])).toBe("Ada, Grace and Linus");
    expect(english.list(["tea", "coffee"], "disjunction")).toBe("tea or coffee");
  });
});

function Count() {
  const { locale, number } = useFormatters();

  return <p>{`${locale} ${number(1234)}`}</p>;
}

describe("useFormatters", () => {
  it("follows the language of the page", () => {
    render(
      <LocaleProvider initial="de">
        <Count />
      </LocaleProvider>,
    );

    expect(screen.getByText("de 1.234")).toBeTruthy();
  });
});
