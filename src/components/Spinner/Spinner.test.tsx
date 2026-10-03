import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./index";

describe("Spinner", () => {
  it("announces that something is loading", () => {
    render(<Spinner />);

    expect(screen.getByRole("status").textContent).toBe("Loading");
  });

  it("says what it is given", () => {
    render(<Spinner label="Saving" className="extra" />);

    expect(screen.getByRole("status").textContent).toBe("Saving");
    expect(screen.getByRole("status").className).toContain("extra");
  });
});
