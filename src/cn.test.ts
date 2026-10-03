import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins the class names that are there and drops the rest", () => {
    expect(cn("one", false, null, undefined, "", "two")).toBe("one two");
  });

  it("is an empty string when nothing is left", () => {
    expect(cn(false, null)).toBe("");
  });
});
