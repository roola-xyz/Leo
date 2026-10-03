import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextArea } from "./index";

describe("TextArea", () => {
  it("is labelled and six rows tall by default", () => {
    render(<TextArea label="Message" className="extra" />);

    const area = screen.getByLabelText("Message") as HTMLTextAreaElement;

    expect(area.getAttribute("rows")).toBe("6");
    expect(area.className).toContain("extra");
    expect(area.getAttribute("aria-describedby")).toBeNull();
  });

  it("points at its hint, at the height it is given", () => {
    render(<TextArea label="Message" hint="Keep it short." rows={3} />);

    const area = screen.getByLabelText("Message") as HTMLTextAreaElement;

    expect(area.getAttribute("rows")).toBe("3");
    expect(area.getAttribute("aria-describedby")).toBe(screen.getByText("Keep it short.").id);
  });

  it("shows the error instead of the hint", () => {
    render(<TextArea label="Message" hint="Keep it short." error="Too long." />);

    const area = screen.getByLabelText("Message");

    expect(screen.queryByText("Keep it short.")).toBeNull();
    expect(area.getAttribute("aria-invalid")).toBe("true");
    expect(area.className).toContain("border-error");
    expect(screen.getByText("Too long.").className).toContain("text-error");
  });
});
