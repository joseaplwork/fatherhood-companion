import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    multiline: { control: "boolean" },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Full name",
    htmlFor: "name",
    inputProps: { placeholder: "Marcus Davies" },
  },
};

export const WithHint: Story = {
  args: {
    label: "Email address",
    htmlFor: "email",
    hint: "We never share your email with third parties.",
    inputProps: { placeholder: "marcus@example.com", type: "email" },
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    htmlFor: "password",
    error: "Password must be at least 8 characters.",
    inputProps: { type: "password" },
  },
};

export const Multiline: Story = {
  args: {
    label: "Today's note",
    htmlFor: "note",
    multiline: true,
    hint: "Your diary entry stays private.",
    inputProps: { placeholder: "What happened today?", rows: 4 },
  },
};

export const MultilineError: Story = {
  name: "Multiline with error",
  args: {
    label: "Bio",
    htmlFor: "bio",
    multiline: true,
    error: "Bio is required.",
  },
};
