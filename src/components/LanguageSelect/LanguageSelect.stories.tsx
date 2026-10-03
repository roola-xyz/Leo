import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageSelect } from ".";

const LANGUAGES = [
  { value: "en-GB", label: "English (UK)" },
  { value: "fr-FR", label: "Français" },
  { value: "de-DE", label: "Deutsch" },
  { value: "pt-BR", label: "Português (Brasil)" },
];

const meta: Meta<typeof LanguageSelect> = {
  title: "Components/LanguageSelect",
  component: LanguageSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("en-GB");

    return <LanguageSelect value={value} options={LANGUAGES} onChange={setValue} label="Language" />;
  },
};
