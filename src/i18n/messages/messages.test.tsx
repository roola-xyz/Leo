import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LANGUAGES } from "../../languages";
import { LocaleProvider } from "../LocaleProvider";
import { useLeoTranslations } from "./index";
import en from "./en";
import de from "./de";
import es from "./es";
import fr from "./fr";
import it_ from "./it";
import ja from "./ja";
import ko from "./ko";
import nl from "./nl";
import pl from "./pl";
import ptBR from "./pt-BR";
import tr from "./tr";
import zhHans from "./zh-Hans";

const catalogues = { en, de, es, fr, it: it_, ja, ko, nl, pl, "pt-BR": ptBR, tr, "zh-Hans": zhHans };

/** The placeholders and tags a message uses, which a translation has to keep. */
const slots = (message: string) => [...message.matchAll(/\{(\w+)|<(\w+)>/g)].map((match) => match[1] ?? match[2]).sort();

describe("Leo's own catalogue", () => {
  it("has a catalogue for every language the estate offers", () => {
    expect(Object.keys(catalogues).sort()).toEqual(LANGUAGES.map((language) => language.tag).sort());
  });

  it.each(Object.entries(catalogues))("says everything English says, with the same placeholders, in %s", (_, messages) => {
    expect(Object.keys(messages).sort()).toEqual(Object.keys(en).sort());

    for (const [key, message] of Object.entries(en)) {
      expect(message.length).toBeGreaterThan(0);
      expect(slots(messages[key as keyof typeof en]), key).toEqual(slots(message));
    }
  });
});

function Words() {
  const { locale, t, rich } = useLeoTranslations();

  return (
    <>
      <p>{locale}</p>
      <p>{t("menu.managedBy", { organisation: "Real Rights" })}</p>
      <p data-testid="rich">{rich("verification.body", { agent: "Sam", b: (chunks) => <strong>{chunks}</strong> })}</p>
      <p>{t("menu.signOut")}</p>
    </>
  );
}

describe("useLeoTranslations", () => {
  it("speaks English outside a provider", () => {
    render(<Words />);

    expect(screen.getByText("en")).toBeTruthy();
    expect(screen.getByText("Managed by Real Rights")).toBeTruthy();
    expect(screen.getByText("Sam").tagName).toBe("STRONG");
    expect(screen.getByTestId("rich").textContent).toBe("Sam from Roola support is asking you to confirm it is really you.");
  });

  it("speaks the language of the provider above it", () => {
    render(
      <LocaleProvider initial="de">
        <Words />
      </LocaleProvider>,
    );

    expect(screen.getByText("de")).toBeTruthy();
    expect(screen.getByText(de["menu.signOut"])).toBeTruthy();
  });
});
