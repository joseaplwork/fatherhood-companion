"use client";

import { useChat } from "ai/react";

import { Button, ChatMessage, ChatTemplate } from "@ui";

import type { ChatMessageRow } from "../../lib/queries/chat";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  content:
    "Hey! I'm your Dad Companion AI Buddy. I'm here to help you navigate the challenges of fatherhood — from co-parenting questions to emotional support. How are you feeling today?",
};

type ChatViewProps = {
  userName?: string;
  userAvatarSrc?: string | null;
  initialMessages: ChatMessageRow[];
};

export function ChatView({ userName = "", userAvatarSrc, initialMessages }: ChatViewProps) {
  const mappedInitial = initialMessages.map((m) => ({
    id: m.id,
    role: m.role === "USER" ? ("user" as const) : ("assistant" as const),
    content: m.content,
  }));

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: mappedInitial.length > 0 ? mappedInitial : [WELCOME_MESSAGE],
  });

  return (
    <ChatTemplate
      conversationList={
        <div className="px-3">
          <h2 className="font-display text-sm font-semibold text-on-surface px-3 mb-4">
            Conversations
          </h2>
          <div className="w-full rounded-xl bg-secondary-fixed px-3 py-3">
            <p className="font-body text-sm font-medium text-on-surface">AI Buddy</p>
            <p className="font-body text-xs text-on-surface-variant mt-0.5 line-clamp-1">
              Your personal companion
            </p>
          </div>
        </div>
      }
      thread={
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-outline-variant/15">
            <h1 className="font-display text-base font-semibold text-on-surface">AI Buddy</h1>
            <p className="font-body text-xs text-on-surface-variant">Your personal companion</p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
            {messages.map((msg) => {
              const props = {
                role: msg.role as "user" | "assistant",
                content: msg.content,
                userName,
                userAvatarSrc,
              };
              return <ChatMessage key={msg.id} {...props} />;
            })}
            {isLoading && (
              // biome-ignore lint/a11y/useValidAriaRole: role is a custom ChatMessage prop, not an ARIA role
              <ChatMessage role="assistant" content="…" className="opacity-60 animate-pulse" />
            )}
          </div>

          <div className="px-6 py-4 border-t border-outline-variant/15">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Message your AI Buddy…"
                className="flex-1 rounded-full bg-surface-container px-4 py-2.5 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" variant="primary" disabled={!input.trim() || isLoading}>
                Send
              </Button>
            </form>
          </div>
        </div>
      }
    />
  );
}
