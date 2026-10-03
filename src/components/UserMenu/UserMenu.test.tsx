import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ComponentProps } from "react";
import type { LocaleTag } from "../../languages";
import { UserMenu, UserMenuItem, UserMenuRow } from "./index";

const ada = { name: "Ada Lovelace", email: "ada@example.test" };

function menu(overrides: Partial<ComponentProps<typeof UserMenu>> = {}) {
  const props: ComponentProps<typeof UserMenu> = {
    user: ada,
    theme: "light",
    onThemeChange: vi.fn(),
    onSignOut: vi.fn(),
    ...overrides,
  };

  render(<UserMenu {...props} />);

  return props;
}

function openPanel(name = "Ada Lovelace") {
  fireEvent.click(screen.getByRole("button", { name: `Account: ${name}` }));

  return screen.getByLabelText("Account", { selector: "div" });
}

const panel = () => screen.queryByLabelText("Account", { selector: "div" });

describe("UserMenu", () => {
  it("is a trigger with the person's initial until it is opened", () => {
    menu({ user: { ...ada, name: "  ada" } });

    const trigger = screen.getByRole("button", { name: /^Account:/ });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.textContent).toBe("A");
    expect(panel()).toBeNull();
  });

  it("falls back to a question mark when there is no name to take a letter from", () => {
    menu({ user: { ...ada, name: " " } });

    expect(screen.getByRole("button", { name: /^Account:/ }).textContent).toBe("?");
  });

  it("shows the person's picture rather than their initial when there is one", () => {
    menu({ user: { ...ada, image: "https://example.test/ada.png" } });

    const trigger = screen.getByRole("button", { name: "Account: Ada Lovelace" });
    expect(trigger.querySelector("img")?.getAttribute("src")).toBe("https://example.test/ada.png");

    openPanel();
    expect(document.querySelectorAll("img")).toHaveLength(2);
  });

  it("identifies the person in full, with their reference and caption", () => {
    menu({ user: { ...ada, reference: "AG-1042", caption: "@ada" }, panelClassName: "solid" });

    const sheet = openPanel();

    expect(sheet.className).toContain("solid");
    expect(within(sheet).getByText("ada@example.test")).toBeTruthy();
    expect(within(sheet).getByText("AG-1042").className).toContain("font-mono");
    expect(within(sheet).getByText("@ada")).toBeTruthy();
  });

  it("closes from the corner of the person's card when there is no organisation", () => {
    menu();
    openPanel();

    expect(screen.queryByText(/Managed by/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(panel()).toBeNull();
  });

  it("names the organisation across the top, with its mark and a way to its console", () => {
    menu({
      organisation: {
        name: "Common Cause Group",
        image: "https://example.test/ccg.png",
        url: "https://manage.example.test",
        linkLabel: "Open Manage",
      },
    });
    const sheet = openPanel();

    expect(within(sheet).getByText("Managed by Common Cause Group").parentElement?.className).toContain("text-left");
    expect(within(sheet).getByRole("link", { name: "Open Manage" }).getAttribute("href")).toBe(
      "https://manage.example.test",
    );
    expect(sheet.querySelector('img[src="https://example.test/ccg.png"]')).not.toBeNull();

    // One way out, in the top line, not a second in the card.
    expect(within(sheet).getAllByRole("button", { name: "Close" })).toHaveLength(1);
    fireEvent.click(within(sheet).getByRole("button", { name: "Close" }));
    expect(panel()).toBeNull();
  });

  it("links the organisation by its name when it has no label, and centres a line with no mark", () => {
    menu({ organisation: { name: "Real Rights", url: "https://manage.example.test" } });
    const sheet = openPanel();

    expect(within(sheet).getByRole("link", { name: "Real Rights" })).toBeTruthy();
    expect(within(sheet).getByText("Managed by Real Rights").parentElement?.className).toContain("text-center");
  });

  it("names an organisation with nowhere to go without a link", () => {
    menu({ organisation: { name: "Real Rights" } });
    const sheet = openPanel();

    expect(within(sheet).getByText("Managed by Real Rights")).toBeTruthy();
    expect(within(sheet).queryByRole("link")).toBeNull();
  });

  it("links to the account when it is told where that is", () => {
    menu({ accountUrl: "https://accounts.example.test" });
    openPanel();

    const row = screen.getByRole("link", { name: "Manage your Roola account" });
    expect(row.getAttribute("href")).toBe("https://accounts.example.test");
    expect(row.className).toContain("font-medium");
  });

  it("chooses an appearance in place and comes back to the row that opened it", () => {
    const props = menu({ theme: "dark" });
    openPanel();

    const row = screen.getByRole("button", { name: /Appearance/ });
    expect(row.textContent).toContain("Dark");
    expect(row.getAttribute("aria-haspopup")).toBe("true");

    fireEvent.click(row);

    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("heading", { name: "Appearance" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Dark" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "Light" }).getAttribute("aria-checked")).toBe("false");

    fireEvent.click(screen.getByRole("radio", { name: "Match system" }));

    expect(props.onThemeChange).toHaveBeenCalledWith("system");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: /Appearance/ }));
  });

  it("reads an unknown theme as matching the system", () => {
    menu({ theme: "sepia" as never });
    openPanel();

    expect(screen.getByRole("button", { name: /Appearance/ }).textContent).toContain("Match system");
  });

  it("draws the language row only when it can save a choice", () => {
    menu({ locale: "de" });
    openPanel();

    expect(screen.queryByRole("button", { name: /Language/ })).toBeNull();
  });

  it("chooses a language by its own name", () => {
    const props = menu({ locale: "de", onLocaleChange: vi.fn() });
    openPanel();

    const row = screen.getByRole("button", { name: /Language/ });
    expect(row.textContent).toContain("Deutsch");

    fireEvent.click(row);
    expect(screen.getByRole("heading", { name: "Language" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Deutsch" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByText("Français").getAttribute("lang")).toBe("fr");

    fireEvent.click(screen.getByRole("radio", { name: "Français" }));

    expect(props.onLocaleChange).toHaveBeenCalledWith("fr");
    expect(screen.getByRole("button", { name: /Language/ })).toBeTruthy();
  });

  it("shows the tag of a language it has no name for", () => {
    menu({ locale: "cy" as LocaleTag, onLocaleChange: vi.fn() });
    openPanel();

    expect(screen.getByRole("button", { name: /Language/ }).textContent).toContain("cy");
  });

  it("goes back from a view by its back button", () => {
    menu();
    openPanel();

    fireEvent.click(screen.getByRole("button", { name: /Appearance/ }));
    fireEvent.click(screen.getByRole("button", { name: "Back" }));

    expect(screen.getByRole("button", { name: "Sign out" })).toBeTruthy();
  });

  it("uses Escape to go back first, then to close and hand focus to the trigger", () => {
    menu();
    openPanel();

    fireEvent.keyDown(document, { key: "Tab" });
    fireEvent.click(screen.getByRole("button", { name: /Appearance/ }));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Sign out" })).toBeTruthy();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(panel()).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Account: Ada Lovelace" }));
  });

  it("closes on a press outside but not on one inside, and from its trigger", () => {
    menu();
    openPanel();

    fireEvent.mouseDown(screen.getByText("ada@example.test"));
    expect(panel()).not.toBeNull();

    fireEvent.mouseDown(document.body);
    expect(panel()).toBeNull();

    openPanel();
    fireEvent.click(screen.getByRole("button", { name: /Appearance/ }));
    fireEvent.click(screen.getByRole("button", { name: "Account: Ada Lovelace" }));
    expect(panel()).toBeNull();

    // Opened again, it starts from the front.
    openPanel();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeTruthy();
  });

  it("closes before signing out", () => {
    const props = menu();
    openPanel();

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    expect(props.onSignOut).toHaveBeenCalledOnce();
    expect(panel()).toBeNull();
  });

  it("carries the product's rows and settings, and hands the rows a way to close", () => {
    menu({
      items: (close) => (
        <UserMenuItem icon="settings" onClick={close}>
          Channel settings
        </UserMenuItem>
      ),
      children: (
        <UserMenuRow label="Autoplay">
          <input type="checkbox" aria-label="Autoplay" />
        </UserMenuRow>
      ),
    });
    openPanel();

    expect(screen.getByText("Autoplay", { selector: "span" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Channel settings" }));
    expect(panel()).toBeNull();
  });

  it("puts the policies and any other links along the foot", () => {
    menu({ policiesUrl: "https://policies.example.test/", links: [{ label: "Help", href: "https://help.example.test" }] });
    openPanel();

    expect(screen.getByRole("link", { name: "Privacy Policy" }).getAttribute("href")).toBe(
      "https://policies.example.test/privacy-policy",
    );
    expect(screen.getByRole("link", { name: "Terms of Service" }).getAttribute("href")).toBe(
      "https://policies.example.test/terms-of-service",
    );
    expect(screen.getByRole("link", { name: "Help" })).toBeTruthy();
    expect(screen.getAllByText("·")).toHaveLength(2);
  });

  it("has no foot when there is nothing to put there", () => {
    menu({ links: [] });
    openPanel();

    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("says what an application asks it to say instead", () => {
    menu({ labels: { panel: "Your account", signOut: "Log off" } });

    fireEvent.click(screen.getByRole("button", { name: "Your account: Ada Lovelace" }));

    expect(screen.getByRole("button", { name: "Log off" })).toBeTruthy();
  });
});

describe("UserMenuItem", () => {
  it("is a link when it leaves for somewhere else, and passes on the click", () => {
    const pressed = vi.fn((event: Event) => event.preventDefault());
    render(
      <UserMenuItem href="#elsewhere" onClick={pressed as never} value="On">
        Elsewhere
      </UserMenuItem>,
    );

    const link = screen.getByRole("link", { name: /Elsewhere/ });
    fireEvent.click(link);

    expect(link.getAttribute("href")).toBe("#elsewhere");
    expect(link.textContent).toContain("On");
    expect(pressed).toHaveBeenCalledOnce();
  });

  it("keeps the tick's room on an option that is not chosen", () => {
    render(<UserMenuItem selected={false}>Not this one</UserMenuItem>);

    const option = screen.getByRole("radio", { name: "Not this one" });

    expect(option.getAttribute("aria-checked")).toBe("false");
    expect(option.querySelector("span.w-5")?.childElementCount).toBe(0);
    expect(option.getAttribute("aria-haspopup")).toBeNull();
  });
});
