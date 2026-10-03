import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Menu, MenuItem, MenuLabel, MenuSeparator } from ".";
import { Avatar } from "../Avatar";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="flex h-72 justify-end"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu trigger={<><Avatar name="Ada Lovelace" /><span className="sr-only">Your account</span></>}>
      {(close) => (
        <>
          <MenuLabel>Signed in as Ada</MenuLabel>
          <MenuItem icon="person" onClick={close}>Your profile</MenuItem>
          <MenuItem icon="settings" onClick={close}>Settings</MenuItem>
          <MenuSeparator />
          <MenuItem icon="signOut" danger onClick={close}>Sign out</MenuItem>
        </>
      )}
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /your account/i }));
    await expect(canvas.getByRole("menu")).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();
  },
};

/** `selected` renders a tick in a fixed-width slot, so the labels line up. */
export const Radio: Story = {
  render: () => (
    <Menu trigger={<span className="px-3 py-1 text-sm">Appearance</span>}>
      <div role="radiogroup" aria-label="Appearance">
        <MenuItem icon="desktop" selected={false}>Use device theme</MenuItem>
        <MenuItem icon="sun" selected={false}>Light</MenuItem>
        <MenuItem icon="moon" selected>Dark</MenuItem>
      </div>
    </Menu>
  ),
};
