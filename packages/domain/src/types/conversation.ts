import type { MessageRole } from "../enums/index";

export type AIConversation = {
  id: string;
  providerUserId: string;
  title: string | null;
  summary: string | null;
  moodContext: number | null;
  tokensUsed: number;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  tokensUsed: number;
  createdAt: Date;
};
