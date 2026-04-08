import type { Meta, StoryObj } from "@storybook/react";

import { ChatMessage } from "./chat-message";

const meta = {
  title: "Organisms/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[480px] px-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    role: {
      control: "select",
      options: ["user", "assistant"],
      description:
        "user → primary-container bubble, right-aligned. assistant → surface-container bubble, left-aligned with AI avatar.",
    },
    content: { control: "text" },
    timestamp: { control: "text" },
  },
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  name: "User message",
  args: {
    role: "user",
    content: "I've been struggling to sleep lately. Any advice?",
    userName: "Marcus",
    timestamp: "9:41 AM",
  },
};

export const AssistantMessage: Story = {
  name: "Assistant (AI) message",
  args: {
    role: "assistant",
    content:
      "Sleep issues are really common for single dads dealing with high stress. A few things that tend to help: a consistent wind-down routine, reducing screen time after 9 PM, and even a short 10-minute journaling session before bed.",
    timestamp: "9:41 AM",
  },
};

export const Conversation: Story = {
  name: "Full conversation thread",
  args: { role: "assistant", content: "Good morning!" },
  render: () => {
    const msgs: Array<{
      id: string;
      role: "user" | "assistant";
      content: string;
      userName?: string;
      timestamp: string;
    }> = [
      {
        id: "a1",
        role: "assistant",
        content: "Good morning, Marcus! How are you feeling today?",
        timestamp: "9:00 AM",
      },
      {
        id: "u1",
        role: "user",
        content: "Honestly a bit anxious. Big custody hearing tomorrow.",
        userName: "Marcus",
        timestamp: "9:03 AM",
      },
      {
        id: "a2",
        role: "assistant",
        content:
          "That's completely understandable. Would you like to talk through what's worrying you most, or would a breathing exercise help right now?",
        timestamp: "9:03 AM",
      },
    ];
    return (
      <div className="flex flex-col gap-4 w-120 px-4">
        {msgs.map(({ id, ...m }) => (
          <ChatMessage key={id} {...m} />
        ))}
      </div>
    );
  },
};
