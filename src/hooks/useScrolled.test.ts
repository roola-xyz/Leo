import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useScrolled } from "./useScrolled";

function scrollTo(position: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value: position });
  window.dispatchEvent(new Event("scroll"));
}

afterEach(() => {
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
});

describe("useScrolled", () => {
  it("is false at the top of the page and true once scrolled", () => {
    const { result } = renderHook(() => useScrolled());

    expect(result.current).toBe(false);

    act(() => scrollTo(5));
    expect(result.current).toBe(true);

    act(() => scrollTo(0));
    expect(result.current).toBe(false);
  });

  it("starts true on a page that opens part-way down", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 400 });

    const { result } = renderHook(() => useScrolled(100));

    expect(result.current).toBe(true);
  });

  it("waits for the threshold", () => {
    const { result } = renderHook(() => useScrolled(100));

    act(() => scrollTo(100));
    expect(result.current).toBe(false);

    act(() => scrollTo(101));
    expect(result.current).toBe(true);
  });

  it("stops listening once unmounted", () => {
    const { result, unmount } = renderHook(() => useScrolled());

    unmount();
    act(() => scrollTo(50));

    expect(result.current).toBe(false);
  });
});
