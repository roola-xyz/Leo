import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider, useLocale } from "../i18n/LocaleProvider";
import { useLocalePreference } from "./useLocalePreference";

afterEach(() => localStorage.clear());

describe("useLocalePreference", () => {
  it("keeps the choice to itself without a provider, starting from the cached one", () => {
    localStorage.setItem("roola.locale", "nl");
    const persist = vi.fn(() => Promise.resolve());

    const { result } = renderHook(() => useLocalePreference(persist));

    expect(result.current.locale).toBe("nl");

    act(() => result.current.change("pl"));

    expect(result.current.locale).toBe("pl");
    expect(persist).toHaveBeenCalledWith("pl");
  });

  it("changes the language of the whole page under a provider", () => {
    const persist = vi.fn(() => Promise.resolve());
    const wrapper = ({ children }: { children: ReactNode }) => <LocaleProvider initial="en">{children}</LocaleProvider>;

    const { result } = renderHook(() => ({ preference: useLocalePreference(persist), page: useLocale() }), { wrapper });

    act(() => result.current.preference.change("fr"));

    expect(result.current.page).toBe("fr");
    expect(result.current.preference.locale).toBe("fr");
  });

  it("adopts the account's preference when it is a language it offers, and ignores it otherwise", () => {
    const { result } = renderHook(() => useLocalePreference(() => Promise.resolve()));

    act(() => result.current.adopt("es"));
    expect(result.current.locale).toBe("es");

    act(() => result.current.adopt("xx"));
    act(() => result.current.adopt(null));
    act(() => result.current.adopt(undefined));
    expect(result.current.locale).toBe("es");
  });

  it("keeps the new language when saving it fails", async () => {
    const persist = vi.fn(() => Promise.reject(new Error("offline")));
    const { result } = renderHook(() => useLocalePreference(persist));

    await act(async () => result.current.change("ko"));

    expect(result.current.locale).toBe("ko");
  });
});
