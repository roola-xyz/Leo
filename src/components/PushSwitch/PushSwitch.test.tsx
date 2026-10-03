import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PushState } from "../../hooks/usePush";

/** The hook is tested on its own; here only what the switch draws for each state matters. */
const push = vi.hoisted(() => ({
  state: "off" as PushState,
  working: false,
  enable: vi.fn(),
  disable: vi.fn(),
  calls: [] as unknown[][],
}));

vi.mock("../../hooks/usePush", () => ({
  usePush: (...args: unknown[]) => {
    push.calls.push(args);

    return { state: push.state, working: push.working, enable: push.enable, disable: push.disable };
  },
}));

const { PushSwitch } = await import("./index");

const api = { subscribe: vi.fn(), unsubscribe: vi.fn() };

beforeEach(() => {
  push.state = "off";
  push.working = false;
  push.calls = [];
});

afterEach(() => vi.clearAllMocks());

describe("PushSwitch", () => {
  it("hands the product's key, its switch and its API to the hook", () => {
    render(<PushSwitch publicKey="key" available api={api} describes="When a bill moves." />);

    expect(push.calls[0]).toEqual(["key", true, api]);
    expect(screen.getByText("Notifications")).toBeTruthy();
    expect(screen.getByText("When a bill moves.")).toBeTruthy();
  });

  it("offers to turn it on when it is off", () => {
    render(<PushSwitch publicKey="key" available api={api} describes="When a bill moves." />);

    expect(screen.getByRole("status").textContent).toBe("Off.");

    fireEvent.click(screen.getByRole("button", { name: "Turn on" }));

    expect(push.enable).toHaveBeenCalled();
  });

  it("offers to turn it off when it is on, and shows it working", () => {
    push.state = "on";
    push.working = true;

    render(<PushSwitch publicKey="key" available api={api} describes="When a bill moves." />);

    expect(screen.getByRole("status").textContent).toBe("On. We will ring this browser.");
    expect(screen.getByRole("button", { name: "Turn off" }).getAttribute("aria-busy")).toBe("true");
  });

  it("turns it off when pressed", async () => {
    push.state = "on";

    render(<PushSwitch publicKey="key" available api={api} describes="When a bill moves." />);

    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Turn off" })));

    expect(push.disable).toHaveBeenCalled();
  });

  it.each([
    ["unsupported", "This browser cannot show notifications from a website."],
    ["unavailable", "Not available here yet."],
    ["blocked", "You have blocked notifications for this site in your browser. Only the browser's own settings can change that."],
  ] as const)("gives a sentence, not a dead switch, when %s", (state, sentence) => {
    push.state = state;

    render(<PushSwitch publicKey="key" available api={api} describes="When a bill moves." />);

    expect(screen.getByRole("status").textContent).toBe(sentence);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("says what the product asks it to say", () => {
    render(
      <PushSwitch
        publicKey="key"
        available
        api={api}
        title="Alerts"
        describes="When a bill moves."
        labels={{ off: "Not ringing.", turnOn: "Ring me" }}
      />,
    );

    expect(screen.getByText("Alerts")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("Not ringing.");
    expect(screen.getByRole("button", { name: "Ring me" })).toBeTruthy();
  });
});
