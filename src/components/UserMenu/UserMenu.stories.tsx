import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { UserMenu, UserMenuItem } from ".";
import type { Theme } from "../ThemeToggle";
import type { LocaleTag } from "../../languages";

const meta: Meta<typeof UserMenu> = {
  title: "Composites/UserMenu",
  component: UserMenu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="flex h-96 justify-end">
        <Story />
      </div>
    ),
  ],
  args: {
    user: { name: "Ada Lovelace", email: "ada@example.com" },
    theme: "system",
    onThemeChange: fn(),
    locale: "en",
    onLocaleChange: fn(),
    accountUrl: "https://accounts.roola.example",
    onSignOut: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /ada/i }));
    await expect(canvas.getByText("ada@example.com")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Sign out" }));
    await expect(args.onSignOut).toHaveBeenCalled();
  },
};

export const WithPicture: Story = {
  args: {
    user: {
      name: "Ada Lovelace",
      email: "ada@example.com",
      image: "https://i.pravatar.cc/128?u=ada",
    },
  },
};

/**
 * A product adds its own rows above sign out — socialise's profile and
 * settings, say.
 */
export const WithLinks: Story = {
  args: {
    user: { name: "Ada Lovelace", email: "ada@example.com", caption: "@ada" },
    items: (close) => (
      <>
        <UserMenuItem icon="person" onClick={close}>
          Your profile
        </UserMenuItem>
        <UserMenuItem icon="settings" onClick={close}>
          Settings
        </UserMenuItem>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /ada/i }));
    await expect(
      canvas.getByRole("link", { name: "Manage your Roola account" }),
    ).toBeVisible();
  },
};

/**
 * Control shows an agent's reference, the thing they read out on a call — and
 * neither the chip nor the language row, because its staff are not accounts
 * users and there is nowhere to save either.
 */
export const WithReference: Story = {
  args: {
    user: {
      name: "Sam Okoye",
      email: "sam@roola.example",
      reference: "AG-1042",
    },
    accountUrl: undefined,
    locale: undefined,
    onLocaleChange: undefined,
  },
};

/** Accounts translates the menu's own words and changes language in place. */
export const Translated: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<Theme>("system");
    const [locale, setLocale] = useState<LocaleTag>("fr");

    return (
      <UserMenu
        {...args}
        theme={theme}
        onThemeChange={setTheme}
        locale={locale}
        onLocaleChange={setLocale}
        accountUrl={undefined}
        labels={{
          panel: "Compte",
          appearance: "Apparence",
          language: "Langue",
          signOut: "Se déconnecter",
        }}
      />
    );
  },
};

/**
 * Most accounts answer to an organisation, and the panel says so across the
 * top — with the way to that organisation's console, and the site's policies
 * along the foot.
 */
export const Managed: Story = {
  args: {
    user: {
      name: "Phil Graham",
      email: "philip@commoncausegroup.com",
      image: "https://i.pravatar.cc/128?u=phil",
    },
    organisation: {
      name: "commoncausegroup.com",
      url: "https://manage.roola.example",
      linkLabel: "Admin console",
    },
    policiesUrl: "https://policies.roola.example",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /phil/i }));
    await expect(
      canvas.getByText("Managed by commoncausegroup.com"),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "Admin console" }),
    ).toBeVisible();
  },
};

/**
 * A setting opens its list inside the panel, with the way back at the top,
 * and the row names the new value on the way back.
 */
export const ChoosingALanguage: Story = {
  render: (args) => {
    const [locale, setLocale] = useState<LocaleTag>("en");

    return (
      <UserMenu
        {...args}
        locale={locale}
        onLocaleChange={(next) => {
          setLocale(next);
          args.onLocaleChange?.(next);
        }}
      />
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /ada/i }));
    await userEvent.click(canvas.getByRole("button", { name: /^Language/ }));
    await expect(canvas.getByRole("radio", { name: "Deutsch" })).toBeVisible();

    await userEvent.click(canvas.getByRole("radio", { name: "Deutsch" }));
    await expect(args.onLocaleChange).toHaveBeenCalledWith("de");
    await expect(
      canvas.getByRole("button", { name: /^Language/ }),
    ).toHaveTextContent("Deutsch");

    // Escape steps back out of a view before it closes the panel.
    await userEvent.click(canvas.getByRole("button", { name: /^Appearance/ }));
    await expect(canvas.getByRole("button", { name: "Back" })).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(canvas.getByText("ada@example.com")).toBeVisible();
  },
};
