import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from ".";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: { children: "Your changes have been saved." },
  argTypes: { tone: { control: "select", options: ["info", "success", "warning", "error"] } },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { tone: "info" } };
export const Success: Story = { args: { tone: "success" } };
export const Warning: Story = { args: { tone: "warning", children: "This session expires in five minutes." } };
export const Error: Story = { args: { tone: "error", children: "That password is not right." } };
