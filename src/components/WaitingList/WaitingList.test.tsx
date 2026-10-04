import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PlatformGate, WaitingList, joinThroughAccounts, type PlatformStatus } from "./index";

const closed: PlatformStatus = {
  name: "Helix",
  open: false,
  waiting_list: true,
  since: "2026-09-01",
  message: null,
};

const openDoor: PlatformStatus = { ...closed, open: true, waiting_list: false };

let assigned: ReturnType<typeof vi.fn<(url: string | URL) => void>>;

beforeEach(() => {
  // Leaving the page is the browser's business; here it is only recorded.
  assigned = vi.fn<(url: string | URL) => void>();
  vi.spyOn(window.location, "assign").mockImplementation(assigned);
});

afterEach(() => {
  vi.restoreAllMocks();
  delete window.roolaWaitingList;
});

function type(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

const joinButton = () => screen.getByRole("button", { name: "Join the waiting list" }) as HTMLButtonElement;

describe("joinThroughAccounts", () => {
  it("sends the visitor to accounts with the door and the address, and never settles", async () => {
    const settled = vi.fn();

    joinThroughAccounts("https://accounts.example.test/register?platform=helix", {
      email: "ada@example.test",
      source: "watch",
    }).then(settled);

    expect(assigned).toHaveBeenCalledWith(
      "https://accounts.example.test/register?platform=helix&source=watch&email=ada%40example.test",
    );

    await act(async () => {});
    expect(settled).not.toHaveBeenCalled();
  });

  it("carries nothing it was not given", () => {
    void joinThroughAccounts("https://accounts.example.test/register", {});

    expect(assigned).toHaveBeenCalledWith("https://accounts.example.test/register");
  });
});

describe("WaitingList", () => {
  it("names the product, its line and the list, and will not send without an address", () => {
    render(
      <WaitingList status={closed} onJoin={vi.fn()} logo={<svg data-testid="mark" />} tagline="Video, made here." />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Helix" })).toBeTruthy();
    expect(screen.getByText("Video, made here.")).toBeTruthy();
    expect(screen.getByTestId("mark")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Helix is not open yet" })).toBeTruthy();
    expect(screen.getByText("Leave your address and we will tell you the moment it is.")).toBeTruthy();
    expect(screen.getByText(/One email when we open/)).toBeTruthy();
    expect(screen.getByLabelText(/Your name/)).toBeTruthy();

    expect(joinButton().disabled).toBe(true);
    type(/Email address/, "ada@example.test");
    expect(joinButton().disabled).toBe(false);
  });

  it("says control's message in place of the usual line", () => {
    render(<WaitingList status={{ ...closed, message: "Back in October." }} onJoin={vi.fn()} />);

    expect(screen.getByText("Back in October.")).toBeTruthy();
  });

  it("hands over a tidied address, name and door, then says so", async () => {
    const onJoin = vi.fn(() => Promise.resolve());
    render(<WaitingList status={closed} onJoin={onJoin} source="studio" />);

    type(/Email address/, "  ada@example.test ");
    type(/Your name/, " Ada ");
    fireEvent.click(joinButton());

    expect(await screen.findByRole("status")).toBeTruthy();
    expect(onJoin).toHaveBeenCalledWith({ email: "ada@example.test", name: "Ada", source: "studio" });
    expect(screen.getByText("You are on the list")).toBeTruthy();
    expect(screen.getByText("ada@example.test").className).toContain("font-medium");
    expect(screen.getByText(/the day Helix opens/)).toBeTruthy();
  });

  it("shows the product's own reason when joining fails, and lets them try again", async () => {
    const onJoin = vi.fn().mockRejectedValueOnce(new Error("That address is already on the list.")).mockResolvedValueOnce(undefined);
    render(<WaitingList status={closed} onJoin={onJoin} />);

    type(/Email address/, "ada@example.test");
    fireEvent.click(joinButton());

    expect(await screen.findByText("That address is already on the list.")).toBeTruthy();
    expect(joinButton().disabled).toBe(false);

    fireEvent.click(joinButton());

    expect(await screen.findByRole("status")).toBeTruthy();
    expect(screen.queryByText("That address is already on the list.")).toBeNull();
  });

  it("falls back to its own words when the failure has none", async () => {
    render(<WaitingList status={closed} onJoin={vi.fn(() => Promise.reject("nope"))} />);

    type(/Email address/, "ada@example.test");
    fireEvent.click(joinButton());

    expect(await screen.findByText("That did not go through. Try again in a minute.")).toBeTruthy();
  });

  it("does not ask the name when joining is registering with accounts", () => {
    render(<WaitingList status={{ ...closed, join_url: "https://accounts.example.test/register" }} onJoin={vi.fn()} />);

    expect(screen.queryByLabelText(/Your name/)).toBeNull();
    expect(screen.getByText(/Next you will make your Roola account, with Helix already on it/)).toBeTruthy();
  });
});

describe("PlatformGate", () => {
  it("draws nothing until it knows, then the product when the door is open", async () => {
    let answer!: (status: PlatformStatus) => void;
    const fetchStatus = vi.fn(() => new Promise<PlatformStatus>((resolve) => (answer = resolve)));

    const { container } = render(
      <PlatformGate fetchStatus={fetchStatus} onJoin={vi.fn()}>
        <p>The product</p>
      </PlatformGate>,
    );

    expect(container.innerHTML).toBe("");

    await act(async () => answer(openDoor));

    expect(screen.getByText("The product")).toBeTruthy();
    expect(fetchStatus).toHaveBeenCalledOnce();
  });

  it("fails open when the product cannot say", async () => {
    render(
      <PlatformGate fetchStatus={() => Promise.reject(new Error("down"))} onJoin={vi.fn()}>
        <p>The product</p>
      </PlatformGate>,
    );

    expect(await screen.findByText("The product")).toBeTruthy();
  });

  it("ignores an answer that arrives after it has gone", async () => {
    let answer!: (status: PlatformStatus) => void;
    let refuse!: (reason: Error) => void;
    const consoleError = vi.spyOn(console, "error");

    const first = render(
      <PlatformGate fetchStatus={() => new Promise((resolve) => (answer = resolve))} onJoin={vi.fn()}>
        <p>The product</p>
      </PlatformGate>,
    );
    const second = render(
      <PlatformGate fetchStatus={() => new Promise((_, reject) => (refuse = reject))} onJoin={vi.fn()}>
        <p>The product</p>
      </PlatformGate>,
    );

    first.unmount();
    second.unmount();

    await act(async () => {
      answer(openDoor);
      refuse(new Error("down"));
    });

    expect(consoleError).not.toHaveBeenCalled();
    expect(screen.queryByText("The product")).toBeNull();
  });

  it("shows the waiting list while the door is closed, joining through the product's API", async () => {
    const onJoin = vi.fn(() => Promise.resolve());
    render(
      <PlatformGate fetchStatus={() => Promise.resolve(closed)} onJoin={onJoin} source="watch" tagline="Video.">
        <p>The product</p>
      </PlatformGate>,
    );

    await screen.findByRole("heading", { name: "Helix is not open yet" });
    expect(screen.queryByText("The product")).toBeNull();
    expect(screen.getByText("Video.")).toBeTruthy();

    type(/Email address/, "ada@example.test");
    fireEvent.click(joinButton());

    await screen.findByRole("status");
    expect(onJoin).toHaveBeenCalledWith({ email: "ada@example.test", name: "", source: "watch" });
  });

  it("joins through accounts when accounts says where", async () => {
    const onJoin = vi.fn();
    render(
      <PlatformGate
        fetchStatus={() => Promise.resolve({ ...closed, join_url: "https://accounts.example.test/register" })}
        onJoin={onJoin}
        source="watch"
      >
        <p>The product</p>
      </PlatformGate>,
    );

    await screen.findByRole("heading", { name: "Helix is not open yet" });
    type(/Email address/, "ada@example.test");
    fireEvent.click(joinButton());

    await waitFor(() =>
      expect(assigned).toHaveBeenCalledWith("https://accounts.example.test/register?source=watch&email=ada%40example.test"),
    );
    expect(onJoin).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });

  describe("with a landing page", () => {
    /*
     * The frame loads about:blank for real, and fires its own load. What its
     * document turns out to be is what each test decides, by answering for
     * contentDocument before the frame is drawn.
     */
    function gate(status: PlatformStatus, onJoin = vi.fn(() => Promise.resolve())) {
      const { unmount } = render(
        <PlatformGate fetchStatus={() => Promise.resolve(status)} onJoin={onJoin} source="watch" landing="about:blank">
          <p>The product</p>
        </PlatformGate>,
      );

      return { onJoin, unmount };
    }

    function framed(page: () => Document | null) {
      vi.spyOn(HTMLIFrameElement.prototype, "contentDocument", "get").mockImplementation(page);
    }

    const closedDoor = () => screen.findByRole("heading", { name: "Helix is not open yet" });

    it("lays the list on the window for the page to find, and takes it away again", async () => {
      const { onJoin, unmount } = gate({ ...closed, message: "Soon." });

      await screen.findByTitle("Helix");
      expect(window.roolaWaitingList?.message).toBe("Soon.");

      await window.roolaWaitingList!.join("ada@example.test");
      expect(onJoin).toHaveBeenCalledWith({ email: "ada@example.test", name: "", source: "watch" });

      unmount();
      expect(window.roolaWaitingList).toBeUndefined();
    });

    it("lets the landing page name the tab when it is one", async () => {
      document.title = "Helix — the product";
      framed(() => ({ title: "Helix is coming", documentElement: { dataset: { landing: "helix" } } }) as never);

      gate(closed);

      await waitFor(() => expect(document.title).toBe("Helix is coming"));
      expect(screen.getByTitle("Helix").tagName).toBe("IFRAME");
      expect(screen.queryByRole("heading", { name: "Helix is not open yet" })).toBeNull();
    });

    it("gives way to the plain waiting list when the frame is not a landing page", async () => {
      // The real about:blank: a document, but nobody's landing page.
      gate(closed);

      expect(await closedDoor()).toBeTruthy();
      expect(screen.queryByTitle("Helix")).toBeNull();
    });

    it("gives way when the frame is another origin's", async () => {
      framed(() => {
        throw new DOMException("Blocked a frame", "SecurityError");
      });

      gate(closed);

      expect(await closedDoor()).toBeTruthy();
    });

    it("gives way when the frame has no document at all", async () => {
      framed(() => null);

      gate(closed);

      expect(await closedDoor()).toBeTruthy();
    });
  });
});
