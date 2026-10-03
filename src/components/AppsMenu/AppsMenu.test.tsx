import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppIcon, AppsMenu } from "./index";

const FAVOURITES_KEY = "roola.apps.favourites";

/** Eight apps: six favourites by default and two left over on the sheet. */
const apps = ["Roola", "Politicise", "Helix", "News", "Adverts", "Manage", "Cloud", "Console"].map((name) => ({
  name,
  description: `${name}, described`,
  url: `https://${name.toLowerCase()}.example.test`,
  icon: name.toLowerCase(),
}));

function answer(body: unknown, ok = true) {
  return vi.fn(() => Promise.resolve({ ok, json: () => Promise.resolve(body) } as Response));
}

let fetched: ReturnType<typeof answer>;

beforeEach(() => {
  localStorage.clear();
  fetched = answer({ apps });
  vi.stubGlobal("fetch", fetched);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/**
 * A drag event carrying `dataTransfer` as the browser's would. Built by hand:
 * the DOM here has no DataTransfer of its own to hand one through.
 */
function drag(target: Element, type: string, dataTransfer: object) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", { value: dataTransfer });

  act(() => {
    target.dispatchEvent(event);
  });

  return event;
}

async function openLauncher() {
  render(<AppsMenu accountsUrl="https://accounts.example.test" panelClassName="extra-panel" />);
  fireEvent.click(screen.getByRole("button", { name: "Roola apps" }));
  await screen.findByRole("link", { name: "Roola" });
}

/** The names of the tiles in the favourites card, in order. */
function favouriteNames() {
  const card = screen.getByRole("heading", { name: "Your favourites" }).closest("[aria-busy]") as HTMLElement;

  return within(card)
    .getAllByRole("listitem")
    .map((item) => (item.firstElementChild as HTMLElement).textContent);
}

function toggleEditing(name: "Edit favourites" | "Done") {
  fireEvent.click(screen.getByRole("button", { name }));
}

describe("AppsMenu", () => {
  it("asks accounts for the apps only when first opened", async () => {
    render(<AppsMenu accountsUrl="https://accounts.example.test" />);

    expect(fetched).not.toHaveBeenCalled();

    const trigger = screen.getByRole("button", { name: "Roola apps" });
    fireEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Loading…")).toBeTruthy();

    await screen.findByRole("link", { name: "Roola" });

    expect(fetched).toHaveBeenCalledWith("https://accounts.example.test/api/apps", {
      headers: { Accept: "application/json" },
    });

    // Closed and opened again, the list it already has is enough.
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(fetched).toHaveBeenCalledOnce();
  });

  it("makes the first six apps the favourites and puts the rest on the sheet", async () => {
    await openLauncher();

    expect(favouriteNames()).toEqual(["Roola", "Politicise", "Helix", "News", "Adverts", "Manage"]);

    const cloud = screen.getByRole("link", { name: "Cloud" });
    expect(cloud.getAttribute("href")).toBe("https://cloud.example.test");
    expect(cloud.getAttribute("title")).toBe("Cloud, described");
    expect(screen.getByLabelText("Roola apps", { selector: "div" }).className).toContain("extra-panel");
  });

  it("keeps showing the loading tiles when accounts refuses", async () => {
    fetched = answer({}, false);
    vi.stubGlobal("fetch", fetched);

    render(<AppsMenu accountsUrl="https://accounts.example.test" />);
    fireEvent.click(screen.getByRole("button", { name: "Roola apps" }));

    await waitFor(() => expect(fetched).toHaveBeenCalled());
    await act(async () => {});

    expect(screen.getByText("Loading…")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Edit favourites" })).toBeNull();
  });

  it("treats an answer with no list as no apps", async () => {
    fetched = answer({});
    vi.stubGlobal("fetch", fetched);

    render(<AppsMenu accountsUrl="https://accounts.example.test" />);
    fireEvent.click(screen.getByRole("button", { name: "Roola apps" }));

    await waitFor(() => expect(fetched).toHaveBeenCalled());
    await act(async () => {});

    expect(screen.getByText("Loading…")).toBeTruthy();
  });

  it("shrugs off a network failure", async () => {
    fetched = vi.fn(() => Promise.reject(new TypeError("offline")));
    vi.stubGlobal("fetch", fetched);

    render(<AppsMenu accountsUrl="https://accounts.example.test" />);
    fireEvent.click(screen.getByRole("button", { name: "Roola apps" }));

    await waitFor(() => expect(fetched).toHaveBeenCalled());
    await act(async () => {});

    expect(screen.getByText("Loading…")).toBeTruthy();
  });

  it("closes on a click outside, but not on one inside", async () => {
    await openLauncher();

    fireEvent.mouseDown(screen.getByRole("link", { name: "Roola" }));
    expect(screen.queryByLabelText("Roola apps", { selector: "div" })).not.toBeNull();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByLabelText("Roola apps", { selector: "div" })).toBeNull();
  });

  it("leaves editing on Escape first, then closes and hands focus back", async () => {
    await openLauncher();
    const trigger = screen.getByRole("button", { name: "Roola apps" });

    // Any other key is not its business.
    fireEvent.keyDown(document, { key: "Enter" });

    toggleEditing("Edit favourites");
    expect(screen.getByText("Drag a tile to reorder, or use the arrow keys.")).toBeTruthy();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Edit favourites" }).getAttribute("aria-pressed")).toBe("false");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByLabelText("Roola apps", { selector: "div" })).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes from its own close button and stops editing", async () => {
    await openLauncher();
    toggleEditing("Edit favourites");

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByLabelText("Roola apps", { selector: "div" })).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Roola apps" }));

    fireEvent.click(screen.getByRole("button", { name: "Roola apps" }));
    expect(screen.getByRole("button", { name: "Edit favourites" })).toBeTruthy();
  });

  it("adds and removes favourites while editing, and remembers the choice", async () => {
    await openLauncher();
    toggleEditing("Edit favourites");

    // Nothing navigates while arranging: the tiles are buttons.
    expect(screen.queryByRole("link", { name: "Roola" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Add Cloud to favourites" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove Helix from favourites" }));

    expect(favouriteNames()).toEqual(["Roola", "Politicise", "News", "Adverts", "Manage", "Cloud"]);
    expect(JSON.parse(localStorage.getItem(FAVOURITES_KEY)!)).toEqual(favouriteNames());

    toggleEditing("Done");
    expect(screen.getByRole("link", { name: "Helix" })).toBeTruthy();
  });

  it("drops the sheet when everything is a favourite", async () => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(apps.map((app) => app.name)));

    await openLauncher();

    expect(favouriteNames()).toHaveLength(8);
    expect(screen.getAllByRole("list")).toHaveLength(1);
  });

  it("starts from the remembered favourites and forgets names accounts no longer lists", async () => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(["Console", "Gone", "Roola"]));

    await openLauncher();

    expect(favouriteNames()).toEqual(["Console", "Roola"]);
  });

  it("ignores remembered favourites that are not a list of names", async () => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([1, 2]));

    await openLauncher();

    expect(favouriteNames()).toHaveLength(6);
  });

  it("ignores remembered favourites it cannot read", async () => {
    localStorage.setItem(FAVOURITES_KEY, "[\"Roola\",");

    await openLauncher();

    expect(favouriteNames()).toHaveLength(6);
  });

  it("copes with storage it cannot use", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("denied");
    });

    await openLauncher();
    expect(favouriteNames()).toHaveLength(6);

    toggleEditing("Edit favourites");
    fireEvent.click(screen.getByRole("button", { name: "Remove Roola from favourites" }));

    expect(favouriteNames()).toHaveLength(5);
  });

  it("moves a favourite a step with the arrow keys, but not off either end", async () => {
    await openLauncher();
    toggleEditing("Edit favourites");

    const helix = screen.getByRole("button", { name: "Remove Helix from favourites" });

    fireEvent.keyDown(helix, { key: "ArrowLeft" });
    expect(favouriteNames().slice(0, 3)).toEqual(["Roola", "Helix", "Politicise"]);

    fireEvent.keyDown(helix, { key: "ArrowRight" });
    expect(favouriteNames().slice(0, 3)).toEqual(["Roola", "Politicise", "Helix"]);

    fireEvent.keyDown(screen.getByRole("button", { name: "Remove Roola from favourites" }), { key: "ArrowLeft" });
    fireEvent.keyDown(screen.getByRole("button", { name: "Remove Manage from favourites" }), { key: "ArrowRight" });
    fireEvent.keyDown(helix, { key: "ArrowUp" });

    expect(favouriteNames()).toEqual(["Roola", "Politicise", "Helix", "News", "Adverts", "Manage"]);

    // The apps on the sheet are nobody's order.
    fireEvent.keyDown(screen.getByRole("button", { name: "Add Cloud to favourites" }), { key: "ArrowLeft" });
    expect(favouriteNames()).not.toContain("Cloud");
  });

  it("puts a dragged favourite where it is dropped", async () => {
    await openLauncher();
    toggleEditing("Edit favourites");

    const news = screen.getByRole("button", { name: "Remove News from favourites" });
    const roola = screen.getByRole("button", { name: "Remove Roola from favourites" });
    const dataTransfer = { setData: vi.fn(), effectAllowed: "", dropEffect: "" };

    expect(news.getAttribute("draggable")).toBe("true");

    drag(news, "dragstart", dataTransfer);
    expect(dataTransfer.setData).toHaveBeenCalledWith("text/plain", "News");
    expect(dataTransfer.effectAllowed).toBe("move");
    expect(news.className).toContain("opacity-40");

    drag(roola, "dragover", dataTransfer);
    expect(dataTransfer.dropEffect).toBe("move");
    expect(roola.className).toContain("ring-2");

    fireEvent.dragLeave(roola);
    expect(roola.className).not.toContain("ring-2");

    drag(roola, "dragover", dataTransfer);
    expect(drag(roola, "drop", dataTransfer).defaultPrevented).toBe(true);
    fireEvent.dragEnd(news);

    expect(favouriteNames()).toEqual(["News", "Roola", "Politicise", "Helix", "Adverts", "Manage"]);
    expect(screen.getByRole("button", { name: "Remove News from favourites" }).className).not.toContain("opacity-40");
  });

  it("does nothing when a favourite is dropped on itself or nothing was being dragged", async () => {
    await openLauncher();
    toggleEditing("Edit favourites");

    const helix = screen.getByRole("button", { name: "Remove Helix from favourites" });
    const dataTransfer = { setData: vi.fn(), effectAllowed: "", dropEffect: "" };

    drag(helix, "dragstart", dataTransfer);
    drag(helix, "drop", dataTransfer);

    drag(screen.getByRole("button", { name: "Remove Roola from favourites" }), "drop", dataTransfer);

    expect(favouriteNames()).toEqual(["Roola", "Politicise", "Helix", "News", "Adverts", "Manage"]);
    expect(localStorage.getItem(FAVOURITES_KEY)).toBeNull();
  });

  it("will not drag or take a drop on an app that is not a favourite", async () => {
    await openLauncher();
    toggleEditing("Edit favourites");

    const cloud = screen.getByRole("button", { name: "Add Cloud to favourites" });
    const dataTransfer = { setData: vi.fn(), effectAllowed: "", dropEffect: "" };

    expect(cloud.getAttribute("draggable")).toBe("false");

    drag(cloud, "dragstart", dataTransfer);
    drag(cloud, "dragover", dataTransfer);
    drag(cloud, "drop", dataTransfer);

    expect(dataTransfer.setData).not.toHaveBeenCalled();
    expect(cloud.className).not.toContain("ring-2");
    expect(favouriteNames()).not.toContain("Cloud");
  });
});

describe("AppIcon", () => {
  it("draws the product's own mark and colour", () => {
    const { container } = render(<AppIcon name="politicise" className="extra" />);
    const disc = container.firstElementChild as HTMLElement;

    expect(disc.className).toContain("bg-success-container");
    expect(disc.className).toContain("extra");
    expect(container.querySelector("path")?.getAttribute("d")).toMatch(/^M4 20h16/);
  });

  it("falls back to a neutral disc and the play mark for an unknown product", () => {
    const { container } = render(<AppIcon name="unheard-of" />);
    const { container: helix } = render(<AppIcon name="helix" />);

    expect((container.firstElementChild as HTMLElement).className).toContain("bg-primary-container");
    expect(container.querySelector("path")?.getAttribute("d")).toBe(helix.querySelector("path")?.getAttribute("d"));
  });
});
