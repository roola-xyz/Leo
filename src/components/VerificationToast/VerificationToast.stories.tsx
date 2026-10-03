import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { VerificationToast } from ".";

function inSeconds(seconds: number) {
  return new Date(Date.now() + seconds * 1000).toISOString();
}

const meta: Meta<typeof VerificationToast> = {
  title: "Composites/VerificationToast",
  component: VerificationToast,
  tags: ["autodocs"],
  args: {
    verification: {
      uid: "v_01",
      agent_name: "Sam",
      reason: "You asked us to change the email address on your account.",
      challenge: "4 8 1 5",
      expires_at: inSeconds(90),
      seconds_remaining: 90,
    },
    onApprove: fn(async () => undefined),
    onDeny: fn(async () => undefined),
    onLapse: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("alertdialog")).toBeVisible();
    await expect(canvas.getByText("4 8 1 5")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: /it[’']s me/i }));
    await expect(args.onApprove).toHaveBeenCalledWith("v_01");
  },
};

/** Under fifteen seconds the countdown turns red. */
export const AboutToExpire: Story = {
  args: {
    verification: {
      uid: "v_02",
      agent_name: "Sam",
      reason: "Closing your account.",
      challenge: "2 2 7 0",
      expires_at: inSeconds(12),
      seconds_remaining: 12,
    },
  },
};
