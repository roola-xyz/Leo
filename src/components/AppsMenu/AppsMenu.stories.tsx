import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { AppsMenu } from ".";

const meta: Meta<typeof AppsMenu> = {
  title: "Composites/AppsMenu",
  component: AppsMenu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="flex h-96 justify-end"><Story /></div>],
  // The list is fetched from accounts when the menu is first opened, so the
  // default story shows the loading state unless an accounts server is
  // reachable.
  args: { accountsUrl: "http://localhost:8001" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * The launcher with a list, as accounts would answer it.
 */
export const WithApps: Story = {
  args: {
    accountsUrl: "https://accounts.example",
  },
  decorators: [
    (Story) => {
      const apps = [
        { name: "Roola", description: "Everything you follow", url: "https://roola.example", icon: "roola" },
        { name: "Politicise", description: "Parliament, followed", url: "https://politicise.example", icon: "politicise" },
        { name: "Helix", description: "Video", url: "https://helix.example", icon: "helix" },
        { name: "News", description: "The papers", url: "https://news.example", icon: "news" },
        { name: "Adverts", description: "Advertising", url: "https://adverts.example", icon: "adverts" },
        { name: "Manage", description: "Your organisation", url: "https://manage.example", icon: "manage" },
        { name: "Console", description: "API credentials", url: "https://console.example", icon: "console" },
      ];

      // A previous run's editing must not be this run's starting point.
      localStorage.removeItem("roola.apps.favourites");

      // The list is fetched on first open; here it is answered without a
      // server, and only for the address this story gives.
      const real = window.fetch;
      window.fetch = (input, init) =>
        String(input).startsWith("https://accounts.example/api/apps")
          ? Promise.resolve(new Response(JSON.stringify({ apps }), { headers: { "Content-Type": "application/json" } }))
          : real(input, init);

      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Roola apps" }));

    await expect(await canvas.findByRole("link", { name: "Politicise" })).toBeVisible();
    await expect(canvas.getByRole("heading", { name: "Your favourites" })).toBeVisible();

    // The person leads the favourites, and the seventh app sits below the card.
    await expect(canvas.getByRole("link", { name: "Account" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Console" })).toBeVisible();

    // Editing: the pencil turns the tiles into add/remove buttons, and one
    // click moves an app between the card and the sheet.
    await userEvent.click(canvas.getByRole("button", { name: "Edit favourites" }));
    await userEvent.click(canvas.getByRole("button", { name: "Add Console to favourites" }));
    await userEvent.click(canvas.getByRole("button", { name: "Remove Manage from favourites" }));
    await expect(canvas.getByRole("button", { name: "Add Manage to favourites" })).toBeVisible();

    // The arrow keys move a favourite a step at a time; Helix was third
    // after Roola and Politicise, and goes to the front.
    const helix = canvas.getByRole("button", { name: "Remove Helix from favourites" });
    helix.focus();
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");

    await userEvent.click(canvas.getByRole("button", { name: "Done" }));

    // Account first, then the favourites in their new order, then Manage
    // below the card.
    // The name is the tile's last line; the portrait's initial is hidden
    // from readers but not from textContent.
    const names = canvas.getAllByRole("link").map((link) => link.lastElementChild?.textContent);
    await expect(names.slice(0, 4)).toEqual(["Account", "Helix", "Roola", "Politicise"]);
    await expect(names[names.length - 1]).toBe("Manage");
    await expect(JSON.parse(localStorage.getItem("roola.apps.favourites") ?? "[]")[0]).toBe("Helix");

    // The close button on the top line shuts it, as it does the account menu.
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await expect(canvas.queryByRole("link", { name: "Politicise" })).not.toBeInTheDocument();
  },
};
