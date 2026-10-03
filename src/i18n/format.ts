/**
 * The message syntax every Roola catalogue is written in, and the code that
 * turns one message into words.
 *
 * A subset of ICU MessageFormat — the part a translator has seen before and
 * the part an interface actually needs:
 *
 *   "Hello, {name}."
 *   "{count, plural, =0 {No results} one {# result} other {# results}}"
 *   "{status, select, open {Open} closed {Closed} other {Unknown}}"
 *   "Read the <link>help article</link> first."
 *
 * Plural categories come from `Intl.PluralRules`, so Polish gets its three
 * forms and Japanese its one without anybody writing those rules down here.
 * Numbers, dates and `#` are formatted for the locale by the same machinery.
 *
 * The tags are the part ICU does not have. A sentence with a link in the
 * middle cannot be split into "before" and "after" strings without forcing
 * every translation to keep English word order, so the whole sentence is one
 * message and the application supplies what `<link>` becomes.
 *
 * A single quote quotes, as in ICU, but only where it has to: `'{'` is a
 * literal brace and `''` a literal apostrophe. An apostrophe followed by a
 * letter — l'application, it's — is just an apostrophe, because that is what
 * every translation is full of.
 */

import type { ReactNode } from "react";

export type Node =
  | { type: "text"; value: string }
  | { type: "arg"; name: string }
  | { type: "pound" }
  | { type: "plural"; name: string; offset: number; options: Record<string, Node[]> }
  | { type: "select"; name: string; options: Record<string, Node[]> }
  | { type: "tag"; name: string; children: Node[] };

/** What a placeholder may be filled with. Tags take a function of their contents. */
export type Value =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | ReactNode
  | ((chunks: ReactNode[]) => ReactNode);

export type Values = Record<string, Value>;

class Parser {
  private position = 0;

  constructor(private readonly source: string) {}

  parse(): Node[] {
    // At the top level nothing ends the run early: a stray "}" or an
    // unmatched closing tag is read as text, so a typo in a translation shows
    // a strange sentence rather than a blank screen.
    return this.nodes(null);
  }

  /**
   * Nodes up to a closing brace (inside a plural or select option), a closing
   * tag (inside a tag), or the end.
   */
  private nodes(closingTag: string | null, insideBraces = false): Node[] {
    const nodes: Node[] = [];
    let text = "";

    const flush = () => {
      if (text) nodes.push({ type: "text", value: text });
      text = "";
    };

    while (this.position < this.source.length) {
      const character = this.source[this.position]!;

      if (character === "'") {
        const next = this.source[this.position + 1];

        if (next === "'") {
          text += "'";
          this.position += 2;
          continue;
        }

        if (next === "{" || next === "}" || next === "#" || next === "<") {
          // Quoted until the next lone apostrophe.
          this.position += 1;
          const end = this.source.indexOf("'", this.position);
          const stop = end === -1 ? this.source.length : end;
          text += this.source.slice(this.position, stop);
          this.position = stop + 1;
          continue;
        }

        text += "'";
        this.position += 1;
        continue;
      }

      if (character === "}" && insideBraces) {
        break;
      }

      if (character === "#" && insideBraces) {
        flush();
        nodes.push({ type: "pound" });
        this.position += 1;
        continue;
      }

      if (character === "{") {
        flush();
        nodes.push(this.argument());
        continue;
      }

      if (character === "<") {
        const closing = closingTag && this.source.startsWith(`</${closingTag}>`, this.position);

        if (closing) {
          break;
        }

        const tag = this.tag();

        if (tag) {
          flush();
          nodes.push(tag);
          continue;
        }
      }

      text += character;
      this.position += 1;
    }

    flush();

    return nodes;
  }

  /** `{name}`, `{name, plural, …}` or `{name, select, …}`; the cursor is on the "{". */
  private argument(): Node {
    const start = this.position;
    this.position += 1;

    const name = this.identifier();

    this.whitespace();

    if (this.source[this.position] === "}") {
      this.position += 1;
      return { type: "arg", name };
    }

    if (this.source[this.position] !== ",") {
      // Not an argument after all — "{" followed by something we do not
      // understand. Treat the brace as text and carry on after it.
      this.position = start + 1;
      return { type: "text", value: "{" };
    }

    this.position += 1;
    this.whitespace();
    const kind = this.identifier();
    this.whitespace();

    if (this.source[this.position] === ",") {
      this.position += 1;
    }

    this.whitespace();

    let offset = 0;

    if (kind === "plural" && this.source.startsWith("offset:", this.position)) {
      this.position += "offset:".length;
      const digits = this.identifier();
      offset = Number(digits) || 0;
      this.whitespace();
    }

    const options: Record<string, Node[]> = {};

    while (this.position < this.source.length && this.source[this.position] !== "}") {
      const key = this.identifier();
      this.whitespace();

      if (this.source[this.position] !== "{") {
        break;
      }

      this.position += 1;
      options[key] = this.nodes(null, true);

      if (this.source[this.position] === "}") {
        this.position += 1;
      }

      this.whitespace();
    }

    if (this.source[this.position] === "}") {
      this.position += 1;
    }

    if (kind === "plural") {
      return { type: "plural", name, offset, options };
    }

    return { type: "select", name, options };
  }

  /** `<name>…</name>` or `<name/>`; the cursor is on the "<". Null if it is not a tag. */
  private tag(): Node | null {
    const match = /^<([a-zA-Z][a-zA-Z0-9_-]*)\s*(\/?)>/.exec(this.source.slice(this.position));

    if (!match) return null;

    const [whole, name, selfClosing] = match;
    this.position += whole.length;

    if (selfClosing) {
      return { type: "tag", name: name!, children: [] };
    }

    const children = this.nodes(name!);

    const closing = `</${name}>`;

    if (this.source.startsWith(closing, this.position)) {
      this.position += closing.length;
    }

    return { type: "tag", name: name!, children };
  }

  private identifier(): string {
    this.whitespace();
    const start = this.position;

    while (this.position < this.source.length && /[^\s,{}]/.test(this.source[this.position]!)) {
      this.position += 1;
    }

    return this.source.slice(start, this.position);
  }

  private whitespace(): void {
    while (this.position < this.source.length && /\s/.test(this.source[this.position]!)) {
      this.position += 1;
    }
  }
}

const parsed = new Map<string, Node[]>();

/** Parsed once per distinct message; the cache is unbounded because catalogues are finite. */
export function parse(message: string): Node[] {
  let nodes = parsed.get(message);

  if (!nodes) {
    nodes = new Parser(message).parse();
    parsed.set(message, nodes);
  }

  return nodes;
}

const pluralRules = new Map<string, Intl.PluralRules>();
const numberFormats = new Map<string, Intl.NumberFormat>();
const dateFormats = new Map<string, Intl.DateTimeFormat>();

function rules(locale: string): Intl.PluralRules {
  let rule = pluralRules.get(locale);

  if (!rule) {
    rule = new Intl.PluralRules(locale);
    pluralRules.set(locale, rule);
  }

  return rule;
}

function number(locale: string): Intl.NumberFormat {
  let format = numberFormats.get(locale);

  if (!format) {
    format = new Intl.NumberFormat(locale);
    numberFormats.set(locale, format);
  }

  return format;
}

function date(locale: string): Intl.DateTimeFormat {
  let format = dateFormats.get(locale);

  if (!format) {
    format = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
    dateFormats.set(locale, format);
  }

  return format;
}

/**
 * A formatted message: strings, and whatever React nodes the values were.
 * `t()` joins these into one string; `rich()` hands them to React as they are.
 */
export type Part = string | { node: ReactNode };

export function format(
  nodes: Node[],
  values: Values,
  locale: string,
  pound: string | null = null,
): Part[] {
  const parts: Part[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "text":
        parts.push(node.value);
        break;

      case "pound":
        parts.push(pound ?? "#");
        break;

      case "arg": {
        const value = values[node.name];

        if (value === undefined || value === null || value === false) {
          // Left visible on purpose: a placeholder nobody filled is a bug that
          // should be seen, not a word quietly missing from a sentence.
          parts.push(value === undefined ? `{${node.name}}` : "");
        } else if (typeof value === "number") {
          parts.push(number(locale).format(value));
        } else if (value instanceof Date) {
          parts.push(date(locale).format(value));
        } else if (typeof value === "string" || value === true) {
          parts.push(String(value));
        } else if (typeof value === "function") {
          parts.push(`{${node.name}}`);
        } else {
          parts.push({ node: value });
        }
        break;
      }

      case "plural": {
        const raw = values[node.name];
        const count = typeof raw === "number" ? raw : Number(raw);
        const exact = node.options[`=${count}`];
        const category = Number.isFinite(count) ? rules(locale).select(count - node.offset) : "other";
        const option = exact ?? node.options[category] ?? node.options.other ?? [];
        const shown = Number.isFinite(count) ? number(locale).format(count - node.offset) : String(raw);

        parts.push(...format(option, values, locale, shown));
        break;
      }

      case "select": {
        const key = String(values[node.name]);
        const option = node.options[key] ?? node.options.other ?? [];

        parts.push(...format(option, values, locale, pound));
        break;
      }

      case "tag": {
        const inner = format(node.children, values, locale, pound);
        const wrap = values[node.name];

        if (typeof wrap === "function") {
          parts.push({ node: wrap(toNodes(inner)) });
        } else {
          // No renderer given: the words are still shown, just unadorned.
          parts.push(...inner);
        }
        break;
      }
    }
  }

  return parts;
}

/** The parts as one string. React nodes contribute nothing — use `rich()` for those. */
export function toString(parts: Part[]): string {
  let result = "";

  for (const part of parts) {
    if (typeof part === "string") {
      result += part;
    } else if (typeof part.node === "string" || typeof part.node === "number") {
      result += String(part.node);
    }
  }

  return result;
}

/** The parts as React children: adjacent strings merged, nodes keyed by position. */
export function toNodes(parts: Part[]): ReactNode[] {
  const nodes: ReactNode[] = [];
  let text = "";

  for (const part of parts) {
    if (typeof part === "string") {
      text += part;
      continue;
    }

    if (text) {
      nodes.push(text);
      text = "";
    }

    nodes.push(part.node);
  }

  if (text) nodes.push(text);

  return nodes;
}
