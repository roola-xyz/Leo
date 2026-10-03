import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from ".";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Message" },
  decorators: [(Story) => <div className="max-w-md bg-surface p-4"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "As much detail as you can — what you did, and what happened." } };
export const WithError: Story = { args: { error: "Tell us a little more." } };
