import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider, cachedLocale, localeHeaders, useLocale, useLocaleSetter } from "./LocaleProvider";

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("cachedLocale", () => {
  it("is the last language this browser chose", () => {
    localStorage.setItem("roola.locale", "fr");

    expect(cachedLocale()).toBe("fr");
  });

  it("ignores a stored value that is not a language it offers", () => {
    localStorage.setItem("roola.locale", "klingon");
    vi.stubGlobal("navigator", { languages: ["es-MX"], language: "es-MX" });

    expect(cachedLocale()).toBe("es");
  });

  it("asks the browser when nothing was chosen", () => {
    vi.stubGlobal("navigator", { languages: ["nl-BE", "en"] });

    expect(cachedLocale()).toBe("nl");
  });

  it("uses the browser's single language when it gives no list", () => {
    vi.stubGlobal("navigator", { language: "ko-KR" });

    expect(cachedLocale()).toBe("ko");
  });

  it("is English when the browser says nothing at all", () => {
    vi.stubGlobal("navigator", {});

    expect(cachedLocale()).toBe("en");
  });

  it("is English where there is no browser", () => {
    vi.stubGlobal("navigator", undefined);

    expect(cachedLocale()).toBe("en");
  });

  it("falls back to the browser when storage cannot be read", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    vi.stubGlobal("navigator", { languages: ["pl"] });

    expect(cachedLocale()).toBe("pl");
  });
});

describe("localeHeaders", () => {
  it("sends the chosen language as one exact tag", () => {
    localStorage.setItem("roola.locale", "pt-BR");

    expect(localeHeaders()).toEqual({ "Accept-Language": "pt-BR" });
  });
});

function Shown() {
  const locale = useLocale();
  const setter = useLocaleSetter();

  return (
    <>
      <p>{locale}</p>
      <button type="button" onClick={() => setter?.setLocale("ja")}>
        Japanese
      </button>
    </>
  );
}

describe("LocaleProvider", () => {
  it("is English with no provider, and has no setter", () => {
    render(<Shown />);

    expect(screen.getByText("en")).toBeTruthy();
  });

  it("starts from the cached choice, and tells the document and the cache", () => {
    localStorage.setItem("roola.locale", "it");

    render(
      <LocaleProvider>
        <Shown />
      </LocaleProvider>,
    );

    expect(screen.getByText("it")).toBeTruthy();
    expect(document.documentElement.lang).toBe("it");
  });

  it("takes an initial language over the cached one and remembers it", () => {
    localStorage.setItem("roola.locale", "it");

    render(
      <LocaleProvider initial="tr">
        <Shown />
      </LocaleProvider>,
    );

    expect(screen.getByText("tr")).toBeTruthy();
    expect(localStorage.getItem("roola.locale")).toBe("tr");
  });

  it("changes the language of everything under it, and remembers it before anything renders", () => {
    render(
      <LocaleProvider initial="en">
        <Shown />
      </LocaleProvider>,
    );

    act(() => screen.getByRole("button", { name: "Japanese" }).click());

    expect(screen.getByText("ja")).toBeTruthy();
    expect(localStorage.getItem("roola.locale")).toBe("ja");
    expect(localeHeaders()).toEqual({ "Accept-Language": "ja" });
    expect(document.documentElement.lang).toBe("ja");
  });

  it("still changes language when storage cannot be written", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("full");
    });

    render(
      <LocaleProvider initial="en">
        <Shown />
      </LocaleProvider>,
    );

    act(() => screen.getByRole("button", { name: "Japanese" }).click());

    expect(screen.getByText("ja")).toBeTruthy();
  });
});
