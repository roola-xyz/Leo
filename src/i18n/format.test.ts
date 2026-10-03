import { describe, expect, it } from "vitest";
import { format, parse, toString } from "./format";

const say = (message: string, values = {}, locale = "en") =>
  toString(format(parse(message), values, locale));

describe("message format", () => {
  it("fills placeholders", () => {
    expect(say("Hello, {name}.", { name: "Ada" })).toBe("Hello, Ada.");
  });

  it("leaves an unfilled placeholder visible", () => {
    expect(say("Hello, {name}.")).toBe("Hello, {name}.");
  });

  it("formats numbers for the locale", () => {
    expect(say("{n} views", { n: 1234567 })).toBe("1,234,567 views");
    expect(say("{n} views", { n: 1234567 }, "de")).toBe("1.234.567 views");
  });

  it("chooses plural forms with the locale's rules", () => {
    const message = "{count, plural, =0 {No results} one {# result} other {# results}}";

    expect(say(message, { count: 0 })).toBe("No results");
    expect(say(message, { count: 1 })).toBe("1 result");
    expect(say(message, { count: 2 })).toBe("2 results");
  });

  it("knows Polish has more forms than English", () => {
    const message = "{count, plural, one {# plik} few {# pliki} many {# plików} other {# pliku}}";

    expect(say(message, { count: 1 }, "pl")).toBe("1 plik");
    expect(say(message, { count: 3 }, "pl")).toBe("3 pliki");
    expect(say(message, { count: 5 }, "pl")).toBe("5 plików");
    expect(say(message, { count: 22 }, "pl")).toBe("22 pliki");
  });

  it("selects", () => {
    const message = "{state, select, open {Open} closed {Closed} other {Unknown}}";

    expect(say(message, { state: "open" })).toBe("Open");
    expect(say(message, { state: "gone" })).toBe("Unknown");
  });

  it("nests an argument inside a plural option", () => {
    const message = "{count, plural, one {{name} has # follower} other {{name} has # followers}}";

    expect(say(message, { count: 2, name: "Ada" })).toBe("Ada has 2 followers");
  });

  it("hands tags to their renderer and keeps the words otherwise", () => {
    const message = "Read the <link>help article</link> first.";

    expect(say(message)).toBe("Read the help article first.");

    const parts = format(parse(message), { link: (chunks) => ({ wrapped: chunks }) as never }, "en");
    expect(parts).toEqual(["Read the ", { node: { wrapped: ["help article"] } }, " first."]);
  });

  it("treats an apostrophe as an apostrophe unless it quotes", () => {
    expect(say("l'application")).toBe("l'application");
    expect(say("It''s")).toBe("It's");
    expect(say("'{'not a placeholder'}'")).toBe("{not a placeholder}");
  });

  it("does not mistake a comparison for a tag", () => {
    expect(say("a < b and c > d")).toBe("a < b and c > d");
  });
});
