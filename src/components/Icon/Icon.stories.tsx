import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, type IconName } from ".";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "search" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

const NAMES: IconName[] = [
  "menu", "search", "home", "subscriptions", "library", "play", "pause", "replay", "replay10",
  "forward10", "loop", "next", "previous", "autoplay", "miniplayer", "theater", "theaterExit",
  "speed", "volumeHigh", "volumeLow", "volumeMute", "fullscreen", "fullscreenExit",
  "pictureInPicture", "cast", "castConnected", "live", "upload", "create", "like", "share",
  "more", "close", "check", "block", "flag", "chevronDown", "chevronLeft", "chevronRight",
  "person", "settings", "signOut", "globe", "info", "link", "lock", "sun", "moon", "desktop",
  "music", "gaming", "film", "sport", "news", "learning", "technology", "comedy", "travel",
  "food", "making", "talks", "orientation", "tune", "explore", "trash", "edit", "thumbUp",
  "thumbDown", "mail", "ballot", "raiseHand",
];

/** Every glyph in the set, each drawn on Material's 24×24 grid. */
export const All: Story = {
  render: () => (
    <ul className="grid grid-cols-6 gap-4 text-on-surface sm:grid-cols-8">
      {NAMES.map((name) => (
        <li key={name} className="flex flex-col items-center gap-1 text-center">
          <Icon name={name} />
          <span className="text-[0.625rem] text-on-surface-variant">{name}</span>
        </li>
      ))}
    </ul>
  ),
};
