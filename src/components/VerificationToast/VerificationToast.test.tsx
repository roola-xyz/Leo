import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VerificationToast, type Verification } from "./index";

const now = new Date("2026-10-04T12:00:00Z");

function verification(secondsLeft: number): Verification {
  return {
    uid: "ver_1",
    agent_name: "Sam Carter",
    reason: "Changing the billing address",
    challenge: "4821",
    expires_at: new Date(now.getTime() + secondsLeft * 1000).toISOString(),
    seconds_remaining: secondsLeft,
  };
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("VerificationToast", () => {
  it("names the agent, the reason and the number they should read out", () => {
    render(<VerificationToast verification={verification(60)} onApprove={vi.fn()} onDeny={vi.fn()} onLapse={vi.fn()} />);

    const dialog = screen.getByRole("alertdialog", { name: "Identity check requested" });

    expect(dialog.textContent).toContain("Sam Carter from Roola support is asking you to confirm it is really you.");
    expect(screen.getByText("Sam Carter").className).toContain("font-medium");
    expect(screen.getByText("Changing the billing address")).toBeTruthy();
    expect(screen.getByText("4821")).toBeTruthy();
    expect(screen.getByText("Expires in 60s").className).not.toContain("text-error");
  });

  it("counts down from the expiry and turns urgent near the end", () => {
    render(<VerificationToast verification={verification(20)} onApprove={vi.fn()} onDeny={vi.fn()} onLapse={vi.fn()} />);

    act(() => vi.advanceTimersByTime(6000));

    expect(screen.getByText("Expires in 14s").className).toContain("text-error");
  });

  it("goes by the clock rather than the ticks, so a throttled tab does not drift", () => {
    render(<VerificationToast verification={verification(60)} onApprove={vi.fn()} onDeny={vi.fn()} onLapse={vi.fn()} />);

    act(() => {
      vi.setSystemTime(new Date(now.getTime() + 30_000));
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Expires in 29s")).toBeTruthy();
  });

  /**
   * It used to call `onLapse` again every second for as long as the toast was
   * still on screen once the time ran out; a lapse is one event.
   */
  it("says it has lapsed once, when the time runs out", () => {
    const lapsed = vi.fn();
    render(<VerificationToast verification={verification(2)} onApprove={vi.fn()} onDeny={vi.fn()} onLapse={lapsed} />);

    act(() => vi.advanceTimersByTime(10_000));

    expect(screen.getByText("Expires in 0s")).toBeTruthy();
    expect(lapsed).toHaveBeenCalledOnce();
    expect(lapsed).toHaveBeenCalledWith("ver_1");
  });

  it("says it has lapsed once when it arrives already expired", () => {
    const lapsed = vi.fn();
    render(<VerificationToast verification={verification(-5)} onApprove={vi.fn()} onDeny={vi.fn()} onLapse={lapsed} />);

    act(() => vi.advanceTimersByTime(5000));

    expect(lapsed).toHaveBeenCalledOnce();
  });

  it("approves, holding both buttons until the answer has gone", async () => {
    let settle: () => void = () => undefined;
    const approve = vi.fn(() => new Promise<void>((resolve) => (settle = resolve)));
    render(<VerificationToast verification={verification(60)} onApprove={approve} onDeny={vi.fn()} onLapse={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "It’s me" }));

    expect(approve).toHaveBeenCalledWith("ver_1");
    expect(screen.getByRole("button", { name: "It’s me" }).getAttribute("aria-busy")).toBe("true");
    expect((screen.getByRole("button", { name: "Deny" }) as HTMLButtonElement).disabled).toBe(true);

    await act(async () => settle());

    expect((screen.getByRole("button", { name: "Deny" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("denies, and stays to be tried again when that fails", async () => {
    const deny = vi.fn(() => Promise.reject(new Error("offline")));
    render(<VerificationToast verification={verification(60)} onApprove={vi.fn()} onDeny={deny} onLapse={vi.fn()} />);

    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Deny" })));

    expect(deny).toHaveBeenCalledWith("ver_1");
    expect((screen.getByRole("button", { name: "Deny" }) as HTMLButtonElement).disabled).toBe(false);
  });
});
