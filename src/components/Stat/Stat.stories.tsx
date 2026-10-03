import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat } from ".";

const meta: Meta<typeof Stat> = {
  title: "Components/Stat",
  component: Stat,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-72 bg-surface-low p-4"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSparkline: Story = {
  args: { label: "Calls", value: "12,408", note: "11,902 served", spark: [3, 5, 4, 8, 7, 11, 9, 14] },
};

export const Warning: Story = {
  args: { label: "Refused", value: "506", note: "4.1% of calls", tone: "warn" },
};

/** A flat run draws no sparkline — it would read as a plateau, not as nothing. */
export const Flat: Story = {
  args: { label: "Failed", value: "0", note: "Ours, never billed", tone: "good", spark: [0, 0, 0, 0] },
};
