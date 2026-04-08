import type { Meta, StoryObj } from "@storybook/react";

import { ChatMessage } from "../organisms/chat-message";

import { ChatTemplate } from "./chat-template";

const ConversationList = (
  <div className="flex flex-col gap-1 px-3">
    <p className="font-display text-xs font-semibold text-on-surface-variant uppercase tracking-wider px-3 mb-2">
      Conversations
    </p>
    {["Daily check-in", "Parenting strategies", "Sleep advice"].map((title, i) => (
      <button
        key={title}
        type="button"
        className={[
          "w-full text-left rounded-xl px-3 py-2.5 font-body text-sm transition-colors",
          i === 0
            ? "bg-primary-container text-on-primary-container"
            : "text-on-surface hover:bg-surface-container-low",
        ].join(" ")}
      >
        {title}
      </button>
    ))}
  </div>
);

const Thread = (
  <div className="flex flex-col h-full">
    <div className="border-b border-outline-variant/15 px-6 py-4">
      <p className="font-display text-base font-semibold text-on-surface">Daily check-in</p>
    </div>
    <div className="flex flex-col gap-4 flex-1 overflow-y-auto px-6 py-6">
      <ChatMessage
        sender="assistant"
        content="Good morning, Marcus! How are you feeling today?"
        timestamp="9:00 AM"
      />
      <ChatMessage
        sender="user"
        content="A bit tired but otherwise okay. Trying to stay on top of things."
        userName="Marcus"
        timestamp="9:03 AM"
      />
      <ChatMessage
        sender="assistant"
        content="That's a solid start. Even staying on top of things when you're tired takes real effort — give yourself credit for that."
        timestamp="9:03 AM"
      />
    </div>
    <div className="border-t border-outline-variant/15 px-6 py-4">
      <div className="rounded-full bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface-variant">
        Type a message…
      </div>
    </div>
  </div>
);

const MetaPanel = (
  <div className="flex flex-col gap-4">
    <p className="font-display text-sm font-semibold text-on-surface">Conversation info</p>
    <div className="rounded-xl bg-surface-container-low p-4">
      <p className="font-body text-xs text-on-surface-variant">Started</p>
      <p className="font-body text-sm text-on-surface mt-0.5">Today, 9:00 AM</p>
    </div>
    <div className="rounded-xl bg-surface-container-low p-4">
      <p className="font-body text-xs text-on-surface-variant">Messages</p>
      <p className="font-body text-sm text-on-surface mt-0.5">3</p>
    </div>
  </div>
);

const meta = {
  title: "Templates/ChatTemplate",
  component: ChatTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "surface" },
  },
} satisfies Meta<typeof ChatTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Thread only",
  args: {
    conversationList: ConversationList,
    thread: Thread,
  },
};

export const WithMetaPanel: Story = {
  name: "With meta panel",
  args: {
    conversationList: ConversationList,
    thread: Thread,
    metaPanel: MetaPanel,
  },
};
