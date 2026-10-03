import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./index";

describe("Badge", () => {
  it("is neutral unless told otherwise", () => {
    render(<Badge>Draft</Badge>);

    expect(screen.getByText("Draft").className).toContain("bg-secondary-container");
  });

  it.each([
    ["green", "bg-success-container"],
    ["red", "bg-error-container"],
    ["amber", "bg-warning-container"],
    ["blue", "bg-primary-container"],
  ] as const)("is %s in the matching container colour", (tone, expected) => {
    render(<Badge tone={tone}>Status</Badge>);

    expect(screen.getByText("Status").className).toContain(expected);
  });
});
