import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chart } from ".";

const meta: Meta<typeof Chart> = {
  title: "Components/Chart",
  component: Chart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const days = Array.from({ length: 30 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 8, 1 + index));

  return date.toISOString().slice(0, 10);
});

const served = days.map((_, index) => Math.round(400 + 180 * Math.sin(index / 3) + index * 12));
const refused = days.map((_, index) => (index > 20 ? 60 + index * 4 : 8 + (index % 5)));
const failed = days.map((_, index) => (index === 14 ? 42 : index % 9 === 0 ? 3 : 0));

/** The usage chart: served, refused and failed — the colours say which is which. */
export const Usage: Story = {
  args: {
    labels: days,
    series: [
      { label: "Served", values: served },
      { label: "Refused", values: refused },
      { label: "Failed", values: failed },
    ],
    area: true,
    height: 240,
  },
};

/** One series needs no legend; the card title names it. */
export const Bars: Story = {
  args: { labels: days.slice(0, 14), series: [{ label: "Calls", values: served.slice(0, 14) }], kind: "bar" },
};

/** Every value zero: a sentence, not an empty grid. */
export const Empty: Story = {
  args: { labels: days, series: [{ label: "Calls", values: days.map(() => 0) }] },
};
