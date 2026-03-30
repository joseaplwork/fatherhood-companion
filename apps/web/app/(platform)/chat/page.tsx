import { currentUser } from "@clerk/nextjs/server";
import { getActiveConversationMessages } from "../../../lib/queries/chat";
import { ChatView } from "../../../views/chat/chat-view";

export const metadata = { title: "AI Buddy — Dad Companion" };

export default async function ChatPage() {
  const [user, initialMessages] = await Promise.all([
    currentUser(),
    getActiveConversationMessages(),
  ]);
  const userName = user?.fullName ?? user?.firstName ?? "";
  const userAvatarSrc = user?.imageUrl ?? null;
  return (
    <ChatView userName={userName} userAvatarSrc={userAvatarSrc} initialMessages={initialMessages} />
  );
}
