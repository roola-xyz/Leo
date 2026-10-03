import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { IconButton } from ".";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { icon: "search", label: "Search", onClick: fn() },
  argTypes: { size: { control: "select", options: ["sm", "md"] } },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** The label is what a screen reader hears; it is never optional. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: "Search" });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Small: Story = { args: { size: "sm" } };
export const Active: Story = { args: { icon: "like", label: "Liked", active: true } };
export const Disabled: Story = { args: { disabled: true } };
