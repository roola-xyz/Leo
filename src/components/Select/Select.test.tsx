import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./index";

const options = [
  { value: "uk", label: "United Kingdom" },
  { value: "ie", label: "Ireland" },
];

describe("Select", () => {
  it("is a native select with the options given", () => {
    const changed = vi.fn();
    render(<Select label="Country" options={options} onChange={changed} className="extra" />);

    const select = screen.getByLabelText("Country") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "ie" } });

    expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual(["United Kingdom", "Ireland"]);
    expect(changed).toHaveBeenCalled();
    expect(select.className).toContain("extra");
  });

  it("offers an empty first choice when given a placeholder", () => {
    render(<Select label="Country" options={options} placeholder="Choose one" hint="Where you live." />);

    const first = screen.getAllByRole("option")[0] as HTMLOptionElement;

    expect(first.value).toBe("");
    expect(first.textContent).toBe("Choose one");
    expect(screen.getByLabelText("Country").getAttribute("aria-describedby")).toBe(screen.getByText("Where you live.").id);
  });

  it("shows the error instead of the hint", () => {
    render(<Select label="Country" options={options} hint="Where you live." error="Choose a country." />);

    expect(screen.queryByText("Where you live.")).toBeNull();
    expect(screen.getByLabelText("Country").getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByLabelText("Country").className).toContain("border-error");
  });
});
