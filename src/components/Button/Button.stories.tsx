import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from ".";
import { Icon } from "../Icon";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Continue", onClick: fn() },
  argTypes: { variant: { control: "select", options: ["filled", "tonal", "outlined", "text"] } },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: { variant: "filled" },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: /continue/i });

    await expect(button).toBeVisible();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Tonal: Story = { args: { variant: "tonal" } };
export const Outlined: Story = { args: { variant: "outlined" } };
export const Text: Story = { args: { variant: "text" } };

export const WithIcon: Story = {
  args: { icon: <Icon name="upload" className="size-4" />, children: "Upload" },
};

/** Disabled as well as spinning, so it cannot be pressed twice. */
export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = { args: { disabled: true } };
