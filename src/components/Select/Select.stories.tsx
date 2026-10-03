import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from ".";

const OPTIONS = [
  { value: "account", label: "My account" },
  { value: "billing", label: "Billing" },
  { value: "other", label: "Something else" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Topic", options: OPTIONS, placeholder: "Choose one" },
  decorators: [(Story) => <div className="max-w-sm bg-surface p-4"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "Helps us route this to the right team." } };
export const WithError: Story = { args: { error: "Choose a topic." } };
