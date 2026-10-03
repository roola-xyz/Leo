import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ReportDialog } from ".";

const REASONS = [
  { value: "spam", label: "Spam or misleading" },
  { value: "harassment", label: "Harassment or bullying" },
  { value: "violence", label: "Violent or dangerous" },
  { value: "other", label: "Something else" },
];

const meta: Meta<typeof ReportDialog> = {
  title: "Composites/ReportDialog",
  component: ReportDialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    heading: "Report this video",
    subject: "Ten minutes of rain on a tin roof",
    prompt: "What is wrong with this video?",
    reasons: REASONS,
    notePlaceholder: "Where in the video, or anything that would help.",
    onSubmit: fn(async () => "Thanks. Somebody will take a look."),
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Nothing to send until a reason is chosen.
    const report = canvas.getByRole("button", { name: "Report" });
    await expect(report).toBeDisabled();

    await userEvent.click(canvas.getByLabelText("Spam or misleading"));
    await userEvent.click(report);

    await expect(args.onSubmit).toHaveBeenCalledWith("spam", undefined);
    await expect(await canvas.findByText("Thanks. Somebody will take a look.")).toBeVisible();
  },
};

export const Loading: Story = { args: { reasons: null } };

export const CouldNotLoad: Story = {
  args: { reasons: null, reasonsError: "The reasons could not be loaded. Please try again." },
};

/** What a product says above the reasons is its own. */
export const WithPromise: Story = {
  args: {
    heading: "Report this letter to Roola",
    subject: "Re: the bypass",
    prompt: "Why are you reporting this letter?",
    children: (
      <div className="mb-4 rounded-lg border border-outline-variant bg-surface-container p-3 text-sm text-on-surface-variant">
        <p>Somebody at Roola will read this letter and decide whether to withdraw it from your inbox.</p>
        <p className="mt-2">The person who sent it is not told that you reported it.</p>
      </div>
    ),
  },
};
