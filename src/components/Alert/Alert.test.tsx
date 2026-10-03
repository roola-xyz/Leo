import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./index";

describe("Alert", () => {
  it("announces an error at once", () => {
    render(<Alert tone="error">That failed.</Alert>);

    expect(screen.getByRole("alert").textContent).toBe("That failed.");
    expect(screen.getByRole("alert").className).toContain("bg-error-container");
  });

  it("waits for a pause to announce anything else, and is informational by default", () => {
    render(<Alert>Saved.</Alert>);

    expect(screen.getByRole("status").className).toContain("bg-primary-container");
  });

  it("colours success and warning by their tone", () => {
    render(
      <>
        <Alert tone="success">Done.</Alert>
        <Alert tone="warning">Careful.</Alert>
      </>,
    );

    expect(screen.getByText("Done.").className).toContain("bg-success-container");
    expect(screen.getByText("Careful.").className).toContain("bg-warning-container");
  });
});
