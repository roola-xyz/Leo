import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("is hidden from assistive technology and takes the shape it is given", () => {
    const { container } = render(<Skeleton className="h-4 w-24" />);
    const shape = container.firstElementChild!;

    expect(shape.getAttribute("aria-hidden")).toBe("true");
    expect(shape.className).toContain("h-4 w-24");
  });
});
