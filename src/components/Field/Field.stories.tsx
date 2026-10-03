import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from ".";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Email", type: "email" },
  decorators: [(Story) => <div className="max-w-sm bg-surface p-4"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: "ada@example.com" } };
export const WithHint: Story = { args: { hint: "We only use this to sign you in." } };
export const WithError: Story = { args: { defaultValue: "ada@", error: "That does not look like an address." } };
