import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Active" },
  argTypes: { tone: { control: "select", options: ["neutral", "green", "red", "amber", "blue"] } },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge tone="neutral">Draft</Badge>
      <Badge tone="green">Live</Badge>
      <Badge tone="amber">Pending</Badge>
      <Badge tone="red">Revoked</Badge>
      <Badge tone="blue">New</Badge>
    </div>
  ),
};
