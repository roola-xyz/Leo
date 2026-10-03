import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PanelGroup, PanelSurface, PanelTopLine } from "./index";

describe("Panel", () => {
  it("is a named sheet with a way out across the top and cards of rows", () => {
    const closed = vi.fn();

    render(
      <PanelSurface label="Account" className="extra">
        <PanelTopLine onClose={closed} closeLabel="Close">
          <p>Managed by Real Rights</p>
        </PanelTopLine>
        <PanelGroup role="radiogroup" label="Theme" className="group-extra">
          <span>Row</span>
        </PanelGroup>
      </PanelSurface>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(closed).toHaveBeenCalledOnce();
    expect(screen.getByLabelText("Account").className).toContain("extra");
    expect(screen.getByRole("radiogroup", { name: "Theme" }).className).toContain("group-extra");
    expect(screen.getByText("Managed by Real Rights")).toBeTruthy();
  });

  it("draws a top line with nothing but the way out", () => {
    render(<PanelTopLine onClose={() => undefined} closeLabel="Close" />);

    expect(screen.getByRole("button", { name: "Close" }).getAttribute("title")).toBe("Close");
  });
});
