import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ThemeToggle, type Theme } from ".";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Three options, not a switch: matching the system is its own choice. */
export const Default: Story = {
  render: () => {
    const [theme, setTheme] = useState<Theme>("system");

    return <ThemeToggle value={theme} onChange={setTheme} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("radio", { name: "Dark" }));
    await expect(canvas.getByRole("radio", { name: "Dark" })).toBeChecked();
    await expect(canvas.getByRole("radio", { name: "Light" })).not.toBeChecked();
  },
};
