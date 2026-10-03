import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from ".";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** The shape of a video card, before the card. */
export const VideoCard: Story = {
  render: () => (
    <div aria-busy="true" className="w-72 space-y-3">
      <Skeleton className="aspect-video w-full" />
      <div className="flex gap-3">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  ),
};
