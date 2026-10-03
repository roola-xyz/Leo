import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PanelGroup, PanelSurface, PanelTopLine } from ".";

/**
 * The sheet the account menu and the apps launcher share. Shown open, with a
 * title on its top line and one card of rows, so the shape can be seen
 * without either menu's contents in the way.
 */
const meta: Meta<typeof PanelSurface> = {
  title: "Composites/Panel",
  component: PanelSurface,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="relative flex h-80 justify-end">
        <Story />
      </div>
    ),
  ],
  args: { label: "Example panel" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <PanelSurface {...args}>
      <PanelTopLine onClose={fn()} closeLabel="Close">
        <h2 className="text-base font-medium text-on-surface">A title</h2>
      </PanelTopLine>
      <PanelGroup>
        {["One row", "Another row", "A third"].map((row) => (
          <div key={row} className="flex min-h-12 items-center bg-surface px-4 py-3 text-sm dark:bg-surface-high">
            {row}
          </div>
        ))}
      </PanelGroup>
      <PanelGroup>
        <div className="flex min-h-12 items-center bg-surface px-4 py-3 text-sm dark:bg-surface-high">
          A row of a second card
        </div>
      </PanelGroup>
    </PanelSurface>
  ),
};
