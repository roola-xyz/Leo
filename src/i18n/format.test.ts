import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { format, parse, toNodes, toString } from "./format";

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

  it("keeps a stray closing brace as text rather than throwing it away", () => {
    expect(say("Fine} so far")).toBe("Fine} so far");
  });

  it("keeps a brace it cannot read as an argument", () => {
    expect(say("{not an argument here} still reads")).toBe("{not an argument here} still reads");
  });

  it("shows nothing for a value that is deliberately empty", () => {
    expect(say("[{value}]", { value: null })).toBe("[]");
    expect(say("[{value}]", { value: false })).toBe("[]");
  });

  it("prints true and strings as they are", () => {
    expect(say("{flag} {word}", { flag: true, word: "yes" })).toBe("true yes");
  });

  it("formats a date for the locale", () => {
    const moment = new Date(Date.UTC(2026, 8, 12, 12));

    expect(say("Since {when}", { when: moment })).toBe("Since Sep 12, 2026");
  });

  it("leaves a placeholder visible when it is given a tag renderer", () => {
    expect(say("Hello, {name}.", { name: () => "Ada" })).toBe("Hello, {name}.");
  });

  it("hands a React node through untouched, and joins only what is text", () => {
    const element = { type: "strong", props: {} };
    const parts = format(parse("Hello, {name}."), { name: element as never }, "en");

    expect(parts).toEqual(["Hello, ", { node: element }, "."]);
    expect(toString(parts)).toBe("Hello, .");
    expect(toString([{ node: 42 }, { node: "!" }])).toBe("42!");
  });

  it("draws a self-closing tag with no contents", () => {
    const parts = format(parse("Line<br/>break"), { br: (chunks) => `[${chunks.length}]` }, "en");

    expect(toString(parts)).toBe("Line[0]break");
  });

  it("subtracts the offset before choosing the form and printing the count", () => {
    const message = "{count, plural, offset:1 =0 {Nobody} =1 {Just you} one {You and # other} other {You and # others}}";

    expect(say(message, { count: 0 })).toBe("Nobody");
    expect(say(message, { count: 1 })).toBe("Just you");
    expect(say(message, { count: 2 })).toBe("You and 1 other");
    expect(say(message, { count: 4 })).toBe("You and 3 others");
  });

  it("reads an offset that is not a number as no offset", () => {
    expect(say("{count, plural, offset:x other {# left}}", { count: 3 })).toBe("3 left");
  });

  it("prints a count that is not a number as it was given", () => {
    expect(say("{count, plural, one {# item} other {# items}}", { count: "many" })).toBe("many items");
  });

  it("says nothing for a plural or select with no option that fits", () => {
    expect(say("[{count, plural, one {# item}}]", { count: 5 })).toBe("[]");
    expect(say("[{state, select, open {Open}}]", { state: "closed" })).toBe("[]");
  });

  it("stops reading options at the first malformed one", () => {
    expect(say("{state, select, open {Open} closed}", { state: "open" })).toBe("Open");
  });

  it("keeps a pound sign in a select inside a plural as the count", () => {
    const message = "{count, plural, other {{kind, select, file {# files} other {# things}}}}";

    expect(say(message, { count: 3, kind: "file" })).toBe("3 files");
  });

  it("prints a pound sign outside a plural as itself", () => {
    expect(say("{kind, select, other {Ticket #}}", { kind: "x" })).toBe("Ticket #");
  });

  it("accepts a select written without the comma before its options", () => {
    expect(say("{state, select open {Open} other {Shut}}", { state: "open" })).toBe("Open");
  });

  it("forgives a tag that is never closed and a quote that never ends", () => {
    expect(say("<b>bold to the end")).toBe("bold to the end");
    expect(say("'{unterminated")).toBe("{unterminated");
  });

  it("parses a message once and reuses it", () => {
    expect(parse("Cached {once}")).toBe(parse("Cached {once}"));
  });

  it("merges adjacent words into one child and keeps nodes between them", () => {
    const element = { type: "em" } as unknown as ReactNode;

    expect(toNodes(["a", "b", { node: element }, "c"])).toEqual(["ab", element, "c"]);
    expect(toNodes([{ node: element }])).toEqual([element]);
  });
});
