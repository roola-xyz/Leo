import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PushSwitch } from ".";

const meta: Meta<typeof PushSwitch> = {
  title: "Composites/PushSwitch",
  component: PushSwitch,
  tags: ["autodocs"],
  args: {
    publicKey: "BAB7eb26rz95-not-a-real-key",
    available: true,
    describes: "When something you reported has been reviewed.",
    api: { subscribe: fn(async () => undefined), unsubscribe: fn(async () => undefined) },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** In Storybook there is no service worker, so this renders the "unsupported" sentence. */
export const Default: Story = {};

export const Unavailable: Story = {
  args: { available: false, publicKey: null },
};
