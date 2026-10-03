import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReportDialog, type ReportReason } from "./index";

const reasons: ReportReason[] = [
  { value: "spam", label: "Spam" },
  { value: "abuse", label: "Abuse" },
];

function dialog(overrides: Partial<Parameters<typeof ReportDialog>[0]> = {}) {
  const props = {
    heading: "Report this video",
    prompt: "What is wrong with this video?",
    reasons,
    onSubmit: vi.fn(() => Promise.resolve("Thanks — somebody will look at it.")),
    onClose: vi.fn(),
    ...overrides,
  };

  render(<ReportDialog {...props} />);

  return props;
}

describe("ReportDialog", () => {
  it("is a focused, named dialog listing the reasons and naming the thing", () => {
    dialog({ subject: "Cats on a train", children: <p>We never tell anybody who reported.</p> });

    const box = screen.getByRole("dialog", { name: "Report this video" });

    expect(document.activeElement).toBe(box);
    expect(screen.getByRole("group", { name: "What is wrong with this video?" })).toBeTruthy();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByText("Cats on a train").getAttribute("title")).toBe("Cats on a train");
    expect(screen.getByText("We never tell anybody who reported.")).toBeTruthy();
  });

  it("cannot be sent until a reason is chosen", () => {
    dialog();

    const send = screen.getByRole("button", { name: "Report" }) as HTMLButtonElement;
    expect(send.disabled).toBe(true);

    fireEvent.click(screen.getByRole("radio", { name: "Abuse" }));

    expect(send.disabled).toBe(false);
    expect(screen.getByText("Abuse").className).toContain("bg-secondary-container");
  });

  it("sends the reason and the note, then says the one thing it is given", async () => {
    const props = dialog({ doneHeading: "Reported" });

    fireEvent.click(screen.getByRole("radio", { name: "Spam" }));
    fireEvent.change(screen.getByLabelText("Anything else? (optional)"), { target: { value: "Posted ten times" } });
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Report" })));

    expect(props.onSubmit).toHaveBeenCalledWith("spam", "Posted ten times");
    expect(screen.getByRole("heading", { name: "Reported" })).toBeTruthy();
    expect(screen.getByText("Thanks — somebody will look at it.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(props.onClose).toHaveBeenCalled();
  });

  it("sends no note when none was written, and thanks by default", async () => {
    const props = dialog({ submitLabel: "Send report", noteLabel: "Tell us more", notePlaceholder: "Optional" });

    expect(screen.getByLabelText("Tell us more").getAttribute("placeholder")).toBe("Optional");

    fireEvent.click(screen.getByRole("radio", { name: "Spam" }));
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Send report" })));

    expect(props.onSubmit).toHaveBeenCalledWith("spam", undefined);
    expect(screen.getByRole("heading", { name: "Thank you" })).toBeTruthy();
  });

  it("shows the reason it could not be sent, and lets it be sent again", async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error("You have reported this already today.")));
    dialog({ onSubmit });

    fireEvent.click(screen.getByRole("radio", { name: "Spam" }));
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Report" })));

    expect(screen.getByRole("alert").textContent).toBe("You have reported this already today.");
    expect((screen.getByRole("button", { name: "Report" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("says something general when the failure has nothing to say", async () => {
    dialog({ onSubmit: vi.fn(() => Promise.reject("nope")) });

    fireEvent.click(screen.getByRole("radio", { name: "Spam" }));
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Report" })));

    expect(screen.getByRole("alert").textContent).toBe("That could not be sent. Please try again.");
  });

  it("says it is loading while the reasons are on their way", () => {
    dialog({ reasons: null });

    expect(screen.getByText("Loading…")).toBeTruthy();
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
  });

  it("shows why the reasons could not be fetched instead of loading forever", () => {
    dialog({ reasons: null, reasonsError: "Could not load the reasons." });

    expect(screen.getByRole("alert").textContent).toBe("Could not load the reasons.");
    expect(screen.queryByText("Loading…")).toBeNull();
  });

  it("closes on Escape, the backdrop, the close button and Cancel — but not a click inside", () => {
    const props = dialog();

    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.click(screen.getByRole("dialog"));
    expect(props.onClose).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(props.onClose).toHaveBeenCalledTimes(4);
  });
});
