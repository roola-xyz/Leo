import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./index";

describe("Chip", () => {
  it("is one choice of a set, checked when selected and drawn inverted", () => {
    render(<Chip selected>News</Chip>);

    const chip = screen.getByRole("radio", { name: "News" });

    expect(chip.getAttribute("aria-checked")).toBe("true");
    expect(chip.className).toContain("bg-on-surface");
  });

  it("is unchecked by default and reports a press", () => {
    const pressed = vi.fn();
    render(<Chip onClick={pressed}>Sport</Chip>);

    fireEvent.click(screen.getByRole("radio"));

    expect(screen.getByRole("radio").getAttribute("aria-checked")).toBe("false");
    expect(pressed).toHaveBeenCalledOnce();
  });
});
