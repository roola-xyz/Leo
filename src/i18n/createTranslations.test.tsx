import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createTranslations, type Catalogue } from "./createTranslations";
import { useLocaleSetter } from "./LocaleProvider";

const en = {
  "home.title": "Welcome, {name}",
  "home.help": "Read the <link>help</link>.",
  "home.english": "Only in English",
};

type Messages = typeof en;

const es: Messages = {
  "home.title": "Bienvenido, {name}",
  "home.help": "Lee la <link>ayuda</link>.",
  "home.english": "",
};

afterEach(() => {
  localStorage.clear();
});

function Page() {
  const { locale, t, rich, has, number } = useTranslationsHolder.current!();
  const setter = useLocaleSetter();

  return (
    <>
      <h1>{t("home.title", { name: "Ada" })}</h1>
      <p data-testid="help">{rich("home.help", { link: (chunks) => <a href="/help">{chunks}</a> })}</p>
      <p data-testid="fallback">{t("home.english")}</p>
      <p data-testid="locale">{`${locale} ${number(1000)} ${has("home.title")} ${has("nope")}`}</p>
      <button type="button" onClick={() => setter?.setLocale("es")}>Spanish</button>
      <button type="button" onClick={() => setter?.setLocale("fr")}>French</button>
      <button type="button" onClick={() => setter?.setLocale("de")}>German</button>
    </>
  );
}

/** Lets one page component read whichever catalogue a test built. */
const useTranslationsHolder: { current: ReturnType<typeof createTranslations<Messages>>["useTranslations"] | null } = {
  current: null,
};

function build(catalogue: Catalogue<Messages>) {
  const built = createTranslations(catalogue);
  useTranslationsHolder.current = built.useTranslations;

  return built;
}

describe("createTranslations", () => {
  it("speaks English, with placeholders filled and tags drawn", () => {
    const { I18nProvider } = build({ en });

    render(
      <I18nProvider initial="en">
        <Page />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading").textContent).toBe("Welcome, Ada");
    expect(screen.getByRole("link", { name: "help" }).getAttribute("href")).toBe("/help");
    expect(screen.getByTestId("locale").textContent).toBe("en 1,000 true false");
  });

  it("uses a catalogue given as an object at once", () => {
    const { I18nProvider } = build({ en, es });

    render(
      <I18nProvider initial="es">
        <Page />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading").textContent).toBe("Bienvenido, Ada");
  });

  it("falls back to English for a key a language left empty-handed, and to the key when English has none", () => {
    const partial = { ...es } as Partial<Messages>;
    delete partial["home.english"];
    const { translate, I18nProvider } = build({ en, es: partial as Messages });

    render(
      <I18nProvider initial="es">
        <Page />
      </I18nProvider>,
    );

    expect(screen.getByTestId("fallback").textContent).toBe("Only in English");
    expect(translate("missing.key" as never)).toBe("missing.key");
  });

  it("draws the fallback while a language is on its way, then the language", async () => {
    let arrive: (messages: { default: Messages }) => void = () => undefined;
    const { I18nProvider } = build({ en, es: () => new Promise((resolve) => (arrive = resolve)) });

    render(
      <I18nProvider initial="es" fallback={<p>Loading words</p>}>
        <Page />
      </I18nProvider>,
    );

    expect(screen.getByText("Loading words")).toBeTruthy();

    await act(async () => arrive({ default: es }));

    expect(screen.getByRole("heading").textContent).toBe("Bienvenido, Ada");
  });

  it("keeps the old language on screen until the new one has loaded", async () => {
    let arrive: (messages: Messages) => void = () => undefined;
    const loader = vi.fn(() => new Promise<Messages>((resolve) => (arrive = resolve)));
    const { I18nProvider, translate } = build({ en, es: loader });

    render(
      <I18nProvider initial="en">
        <Page />
      </I18nProvider>,
    );

    act(() => screen.getByRole("button", { name: "Spanish" }).click());

    expect(screen.getByRole("heading").textContent).toBe("Welcome, Ada");

    await act(async () => arrive(es));

    expect(screen.getByRole("heading").textContent).toBe("Bienvenido, Ada");
    expect(translate("home.title", { name: "Grace" })).toBe("Bienvenido, Grace");
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it("shows English for a language the catalogue does not have", async () => {
    const { I18nProvider } = build({ en });

    render(
      <I18nProvider initial="en">
        <Page />
      </I18nProvider>,
    );

    await act(async () => screen.getByRole("button", { name: "French" }).click());

    expect(screen.getByTestId("locale").textContent).toBe("fr 1\u202f000 true false");
    expect(screen.getByRole("heading").textContent).toBe("Welcome, Ada");
  });

  it("shows English for a language that failed to arrive", async () => {
    const { I18nProvider } = build({ en, de: () => Promise.reject(new Error("offline")) });

    render(
      <I18nProvider initial="en">
        <Page />
      </I18nProvider>,
    );

    await act(async () => screen.getByRole("button", { name: "German" }).click());

    await waitFor(() => expect(screen.getByTestId("locale").textContent).toBe("de 1.000 true false"));
    expect(screen.getByRole("heading").textContent).toBe("Welcome, Ada");
  });

  it("asks for a language once, however many times it is wanted while on its way", async () => {
    let arrive: (messages: Messages) => void = () => undefined;
    const loader = vi.fn(() => new Promise<Messages>((resolve) => (arrive = resolve)));
    const { load } = build({ en, es: loader });

    const first = load("es");
    const second = load("es");

    arrive(es);

    expect(await first).toBe(es);
    expect(await second).toBe(es);
    expect(await load("es")).toBe(es);
    expect(await load("en")).toBe(en);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it("ignores a language that arrives after the page has moved on", async () => {
    let arrive: (messages: Messages) => void = () => undefined;
    const { I18nProvider } = build({ en, es: () => new Promise<Messages>((resolve) => (arrive = resolve)) });

    const { unmount } = render(
      <I18nProvider initial="es" fallback={<p>Loading words</p>}>
        <Page />
      </I18nProvider>,
    );

    unmount();

    await act(async () => arrive(es));

    expect(screen.queryByText("Loading words")).toBeNull();
  });

  it("translates outside React in English before any provider has rendered", () => {
    const { translate } = build({ en, es });

    expect(translate("home.title", { name: "Linus" })).toBe("Welcome, Linus");
    expect(translate("home.english")).toBe("Only in English");
  });
});
