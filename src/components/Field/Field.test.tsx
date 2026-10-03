import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Field } from "./index";

describe("Field", () => {
  it("is labelled, and passes typing through", () => {
    const changed = vi.fn();
    render(<Field label="Email" type="email" onChange={changed} className="extra" />);

    const input = screen.getByLabelText("Email") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ada@example.test" } });

    expect(changed).toHaveBeenCalled();
    expect(input.type).toBe("email");
    expect(input.className).toContain("extra");
    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(input.getAttribute("aria-describedby")).toBeNull();
  });

  it("points at its hint", () => {
    render(<Field label="Name" hint="As it appears on your card." />);

    const input = screen.getByLabelText("Name");
    const hint = screen.getByText("As it appears on your card.");

    expect(input.getAttribute("aria-describedby")).toBe(hint.id);
  });

  it("shows the error instead of the hint, and says the field is invalid", () => {
    render(<Field label="Name" hint="A hint." error="Required." />);

    const input = screen.getByLabelText("Name");

    expect(screen.queryByText("A hint.")).toBeNull();
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toContain(screen.getByText("Required.").id);
    expect(input.className).toContain("border-error");
  });
});
