import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "../../i18n/LocaleProvider";
import { ThemeToggle } from "./index";

describe("ThemeToggle", () => {
  it("is three named choices with the current one checked", () => {
    render(<ThemeToggle value="dark" onChange={() => undefined} />);

    expect(screen.getByRole("radiogroup", { name: "Appearance" })).toBeTruthy();
    expect(screen.getAllByRole("radio").map((radio) => radio.getAttribute("aria-label"))).toEqual(["Match system", "Light", "Dark"]);
    expect(screen.getByRole("radio", { name: "Dark" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "Light" }).getAttribute("aria-checked")).toBe("false");
  });

  it("reports the choice made", () => {
    const changed = vi.fn();
    render(<ThemeToggle value="system" onChange={changed} />);

    fireEvent.click(screen.getByRole("radio", { name: "Light" }));

    expect(changed).toHaveBeenCalledWith("light");
  });

  it("speaks the language of the page", () => {
    render(
      <LocaleProvider initial="fr">
        <ThemeToggle value="light" onChange={() => undefined} />
      </LocaleProvider>,
    );

    expect(screen.getByRole("radio", { name: "Clair" })).toBeTruthy();
  });
});
