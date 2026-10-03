import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { WaitingList } from ".";

const meta: Meta<typeof WaitingList> = {
  title: "Composites/WaitingList",
  component: WaitingList,
  tags: ["autodocs"],
  // The door is the whole page, backdrop and all; a padded canvas would show a rim of the wrong surface.
  parameters: { layout: "fullscreen" },
  args: {
    status: {
      name: "Helix",
      open: false,
      waiting_list: true,
      since: new Date().toISOString(),
      message: null,
    },
    tagline: "Watch, upload and broadcast. Opening soon.",
    source: "watch",
    onJoin: fn(async () => undefined),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { name: /not open yet/i })).toBeVisible();

    await userEvent.type(canvas.getByLabelText(/email address/i), "ada@example.com");
    await userEvent.click(canvas.getByRole("button", { name: /join the waiting list/i }));

    await expect(args.onJoin).toHaveBeenCalledWith({ email: "ada@example.com", name: "", source: "watch" });
    await expect(canvas.getByRole("status")).toBeVisible();
  },
};

/** Control can write its own sentence for the door. */
export const WithMessage: Story = {
  args: {
    status: {
      name: "Socialise",
      open: false,
      waiting_list: true,
      since: new Date().toISOString(),
      message: "We are letting people in a few hundred at a time. Leave your address and you will hear from us within the month.",
    },
  },
};

export const Refused: Story = {
  args: {
    onJoin: fn(async () => {
      throw new Error("The waiting list is not available right now. Try again in a minute.");
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/email address/i), "ada@example.com");
    await userEvent.click(canvas.getByRole("button", { name: /join the waiting list/i }));

    await expect(canvas.getByRole("alert")).toHaveTextContent(/not available/i);
  },
};
