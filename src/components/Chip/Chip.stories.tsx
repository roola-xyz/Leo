import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from ".";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { children: "All", selected: true },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {};
export const Unselected: Story = { args: { selected: false } };

/** A filter row: one choice from a set, so it is a radio group. */
export const Row: Story = {
  render: () => {
    const [chosen, setChosen] = useState("All");
    const filters = ["All", "Music", "Gaming", "News", "Learning"];

    return (
      <div role="radiogroup" aria-label="Filter" className="flex gap-2">
        {filters.map((filter) => (
          <Chip key={filter} selected={chosen === filter} onClick={() => setChosen(filter)}>
            {filter}
          </Chip>
        ))}
      </div>
    );
  },
};
