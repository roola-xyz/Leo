import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Menu, MenuItem, MenuLabel, MenuSeparator } from "./index";

function press(target: EventTarget) {
  act(() => {
    target.dispatchEvent(new Event("pointerdown", { bubbles: true }));
  });
}

describe("Menu", () => {
  it("opens from its trigger and says so", () => {
    render(
      <Menu trigger="Options">
        <MenuItem>First</MenuItem>
      </Menu>,
    );

    const trigger = screen.getByRole("button", { name: "Options" });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("menu")).toBeNull();

    fireEvent.click(trigger);

    const menu = screen.getByRole("menu");

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(menu.id);
    expect(menu.className).toContain("right-0");

    fireEvent.click(trigger);

    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("aligns to the start when asked", () => {
    render(
      <Menu trigger="Options" align="start" className="extra">
        <MenuItem>First</MenuItem>
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Options" }));

    expect(screen.getByRole("menu").className).toContain("left-0");
    expect(screen.getByRole("menu").className).toContain("extra");
  });

  it("closes on a press anywhere else, but not on a press inside it", () => {
    render(
      <>
        <p>Elsewhere</p>
        <Menu trigger="Options">
          <MenuItem>First</MenuItem>
        </Menu>
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Options" }));

    press(screen.getByRole("menuitem", { name: "First" }));
    expect(screen.getByRole("menu")).toBeTruthy();

    press(screen.getByText("Elsewhere"));
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes on Escape and puts the keyboard back on the trigger", () => {
    render(
      <Menu trigger="Options">
        <MenuItem>First</MenuItem>
      </Menu>,
    );

    const trigger = screen.getByRole("button", { name: "Options" });
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: "Enter" });
    expect(screen.getByRole("menu")).toBeTruthy();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("hands a function its way to close", () => {
    const chosen = vi.fn();

    render(
      <Menu trigger="Options">
        {(close) => (
          <MenuItem
            onClick={() => {
              chosen();
              close();
            }}
          >
            Pick
          </MenuItem>
        )}
      </Menu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Options" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Pick" }));

    expect(chosen).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("MenuItem", () => {
  it("is a link when it has somewhere to go", () => {
    // The click is recorded, not followed: following it would leave for the network.
    const pressed = vi.fn((event: Event) => event.preventDefault());
    render(
      <MenuItem href="https://help.example.test" target="_blank" rel="noreferrer" icon="info" onClick={pressed as never}>
        Help
      </MenuItem>,
    );

    const link = screen.getByRole("menuitem", { name: "Help" });
    fireEvent.click(link);

    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("https://help.example.test");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noreferrer");
    expect(link.querySelector("svg")).not.toBeNull();
    expect(pressed).toHaveBeenCalledOnce();
  });

  it("is a radio with a tick when it is one of a set", () => {
    render(
      <>
        <MenuItem selected>Chosen</MenuItem>
        <MenuItem selected={false}>Not chosen</MenuItem>
      </>,
    );

    const chosen = screen.getByRole("menuitemradio", { name: "Chosen" });
    const other = screen.getByRole("menuitemradio", { name: "Not chosen" });

    expect(chosen.getAttribute("aria-checked")).toBe("true");
    expect(chosen.querySelector("svg")).not.toBeNull();
    expect(other.getAttribute("aria-checked")).toBe("false");
    expect(other.querySelector("svg")).toBeNull();
  });

  it("is drawn in the error colour when it is dangerous", () => {
    render(<MenuItem danger>Delete</MenuItem>);

    expect(screen.getByRole("menuitem", { name: "Delete" }).className).toContain("text-error");
  });
});

describe("MenuLabel and MenuSeparator", () => {
  it("draw a heading and a rule", () => {
    const { container } = render(
      <>
        <MenuLabel>Account</MenuLabel>
        <MenuSeparator />
      </>,
    );

    expect(screen.getByText("Account")).toBeTruthy();
    expect(container.querySelector("hr")).not.toBeNull();
  });
});
