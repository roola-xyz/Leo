import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardBody, CardHeader } from ".";
import { Button } from "../Button";
import { Field } from "../Field";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader title="Sign in" description="With your Roola account." />
      <CardBody className="space-y-4">
        <Field label="Email" type="email" />
        <Field label="Password" type="password" />
        <Button className="w-full">Continue</Button>
      </CardBody>
    </Card>
  ),
};
