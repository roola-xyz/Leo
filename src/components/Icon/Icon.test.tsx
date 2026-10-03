import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./index";

describe("Icon", () => {
  it("is a decorative, filled glyph at the default size", () => {
    const { container } = render(<Icon name="home" />);
    const svg = container.querySelector("svg")!;
    const path = svg.querySelector("path")!;

    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.getAttribute("class")).toContain("size-6");
    expect(path.getAttribute("d")).toBe("M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z");
    expect(path.getAttribute("fill")).toBe("currentColor");
    expect(path.getAttribute("stroke")).toBeNull();
  });

  it("can be drawn as an outline at a size given by class", () => {
    const { container } = render(<Icon name="home" filled={false} className="size-4" />);
    const svg = container.querySelector("svg")!;
    const path = svg.querySelector("path")!;

    expect(svg.getAttribute("class")).toContain("size-4");
    expect(svg.getAttribute("class")).not.toContain("size-6");
    expect(path.getAttribute("fill")).toBe("none");
    expect(path.getAttribute("stroke")).toBe("currentColor");
    expect(path.getAttribute("stroke-width")).toBe("2");
  });
});
