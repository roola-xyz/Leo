import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stat } from "./index";

describe("Stat", () => {
  it("shows a label and a value, with no note or sparkline when there are none", () => {
    const { container } = render(<Stat label="Calls" value="1,204" />);

    expect(screen.getByText("Calls")).toBeTruthy();
    expect(screen.getByText("1,204").className).not.toContain("animate-pulse");
    expect(container.querySelector("svg")).toBeNull();
  });

  it("greys the value while loading", () => {
    render(<Stat label="Calls" value="—" loading />);

    expect(screen.getByText("—").className).toContain("animate-pulse");
  });

  it.each([
    ["plain", "text-on-surface-variant"],
    ["good", "text-success"],
    ["warn", "text-warning"],
    ["bad", "text-error"],
  ] as const)("colours a %s note, never the value", (tone, expected) => {
    render(<Stat label="Calls" value="12" note="Up on last month" tone={tone} />);

    expect(screen.getByText("Up on last month").className).toContain(expected);
    expect(screen.getByText("12").className).not.toContain(expected === "text-on-surface-variant" ? "text-success" : expected);
  });

  it("draws a sparkline of a history that changes", () => {
    const { container } = render(<Stat label="Calls" value="4" spark={[0, 2, 4]} />);
    const paths = container.querySelectorAll("svg path");

    expect(paths).toHaveLength(2);
    expect(paths[1]!.getAttribute("d")).toBe("M0,30 L44,16 L88,2");
  });

  it("draws nothing for a history that is flat or too short to have a shape", () => {
    const flat = render(<Stat label="Flat" value="3" spark={[3, 3, 3]} />);
    const single = render(<Stat label="Single" value="3" spark={[3]} />);

    expect(flat.container.querySelector("svg")).toBeNull();
    expect(single.container.querySelector("svg")).toBeNull();
  });

  it("is wrapped by the action it is given", () => {
    render(<Stat label="Calls" value="12" className="extra" action={(tile) => <a href="/calls">{tile}</a>} />);

    const link = screen.getByRole("link");

    expect(link.getAttribute("href")).toBe("/calls");
    expect(link.firstElementChild?.className).toContain("extra");
  });
});
