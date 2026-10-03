import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./index";

describe("IconButton", () => {
  it("is named by its label and does what it is pressed for", () => {
    const pressed = vi.fn();
    render(<IconButton icon="search" label="Search" onClick={pressed} />);

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    expect(pressed).toHaveBeenCalledOnce();
    expect(button.getAttribute("title")).toBe("Search");
    expect(button.getAttribute("aria-pressed")).toBeNull();
    expect(button.className).toContain("size-10");
  });

  it("can be small and pressed", () => {
    render(<IconButton icon="menu" label="Menu" size="sm" active className="extra" />);

    const button = screen.getByRole("button", { name: "Menu" });

    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.className).toContain("size-9");
    expect(button.className).toContain("bg-surface-high");
    expect(button.className).toContain("extra");
    expect(button.querySelector("svg")?.getAttribute("class")).toContain("size-5");
  });
});
