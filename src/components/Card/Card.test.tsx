import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardBody, CardHeader } from "./index";

describe("Card", () => {
  it("holds a header with a title and description, and a body", () => {
    render(
      <Card className="extra">
        <CardHeader title="Billing" description="Your plan and invoices." />
        <CardBody className="inner">Contents</CardBody>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Billing" })).toBeTruthy();
    expect(screen.getByText("Your plan and invoices.")).toBeTruthy();
    expect(screen.getByText("Contents").className).toContain("inner");
    expect(screen.getByText("Contents").parentElement?.className).toContain("extra");
  });

  it("leaves the description out when there is none", () => {
    const { container } = render(<CardHeader title="Billing" />);

    expect(container.querySelector("p")).toBeNull();
  });
});
