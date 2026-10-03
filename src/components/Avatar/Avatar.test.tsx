import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./index";

/** `alt=""` makes the picture presentational, so there is no role to query by. */
const picture = (container: HTMLElement) => container.querySelector("img");

describe("Avatar", () => {
  it("shows the picture when there is one", () => {
    const { container } = render(<Avatar name="Roola Adverts" src="https://example.test/roola.png" />);

    expect(picture(container)?.getAttribute("src")).toBe("https://example.test/roola.png");
  });

  it("falls back to the initial when the picture will not load", () => {
    const { container } = render(<Avatar name="Roola Adverts" src="https://example.test/gone.png" />);

    fireEvent.error(picture(container)!);

    expect(picture(container)).toBeNull();
    expect(screen.queryByText("R")).not.toBeNull();
  });

  /**
   * The failure belongs to the address, not to the avatar. A list reuses its
   * rows, so one picture that would not load must not turn every subject that
   * later lands in that row into an initial.
   */
  it("tries again when it is given a different picture", () => {
    const { container, rerender } = render(<Avatar name="Roola Adverts" src="https://example.test/gone.png" />);

    fireEvent.error(picture(container)!);
    expect(screen.queryByText("R")).not.toBeNull();

    rerender(<Avatar name="Helix" src="https://example.test/helix.png" />);

    expect(picture(container)?.getAttribute("src")).toBe("https://example.test/helix.png");
  });
});
