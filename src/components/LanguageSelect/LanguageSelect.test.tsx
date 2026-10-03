import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageSelect } from "./index";

const options = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

describe("LanguageSelect", () => {
  it("shows the current language's name and reports a new choice", () => {
    const changed = vi.fn();
    const { container } = render(<LanguageSelect value="de" options={options} onChange={changed} label="Language" className="extra" />);

    const select = screen.getByRole("combobox", { name: "Language" });
    fireEvent.change(select, { target: { value: "en" } });

    expect(container.querySelector("[aria-hidden='true'].truncate")?.textContent).toBe("Deutsch");
    expect(changed).toHaveBeenCalledWith("en");
    expect(container.firstElementChild?.className).toContain("extra");
  });

  it("shows the raw value when it is not one of the options", () => {
    const { container } = render(<LanguageSelect value="xx" options={options} onChange={() => undefined} label="Language" />);

    expect(container.querySelector("[aria-hidden='true'].truncate")?.textContent).toBe("xx");
  });
});
