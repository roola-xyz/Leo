import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./index";

describe("Button", () => {
  it("is a filled button that does what it is pressed for", () => {
    const pressed = vi.fn();
    render(<Button onClick={pressed}>Save</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(pressed).toHaveBeenCalledOnce();
    expect(screen.getByRole("button").className).toContain("bg-primary");
    expect(screen.getByRole("button").getAttribute("aria-busy")).toBe("false");
  });

  it("cannot be pressed again while it is loading, and shows a spinner instead of its icon", () => {
    const pressed = vi.fn();
    const { container } = render(
      <Button loading icon={<span data-testid="icon" />} onClick={pressed}>
        Save
      </Button>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(pressed).not.toHaveBeenCalled();
    expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByRole("button").getAttribute("aria-busy")).toBe("true");
    expect(screen.queryByTestId("icon")).toBeNull();
    expect(container.querySelector("svg.animate-spin")).not.toBeNull();
  });

  it("shows its icon when it is not loading", () => {
    render(<Button icon={<span data-testid="icon" />}>Add</Button>);

    expect(screen.getByTestId("icon")).toBeTruthy();
  });

  it("is disabled when told, and keeps the classes and attributes it is given", () => {
    render(
      <Button variant="outlined" disabled className="w-full" type="submit">
        Send
      </Button>,
    );

    const button = screen.getByRole("button") as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.type).toBe("submit");
    expect(button.className).toContain("border-outline");
    expect(button.className).toContain("w-full");
  });

  it("has a tonal and a text variant", () => {
    render(
      <>
        <Button variant="tonal">Tonal</Button>
        <Button variant="text">Text</Button>
      </>,
    );

    expect(screen.getByRole("button", { name: "Tonal" }).className).toContain("bg-secondary-container");
    expect(screen.getByRole("button", { name: "Text" }).className).toContain("text-primary hover:bg-primary/8");
  });
});
