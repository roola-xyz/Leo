import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from ".";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Ada Lovelace", size: "md" },
  argTypes: { size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] } },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {};

export const Picture: Story = {
  args: { src: "https://i.pravatar.cc/128?u=ada" },
};

/** The colour is stable per name, so a wall of them is scannable. */
export const Wall: Story = {
  render: () => (
    <div className="flex gap-2">
      {["Ada", "Grace", "Linus", "Margaret", "Tim", "Radia", "Ken", "Barbara"].map((name) => (
        <Avatar key={name} name={name} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
