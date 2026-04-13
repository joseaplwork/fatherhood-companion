import { getActiveConversationMessages } from "../../../lib/queries/chat";
import { getUserContext } from "../../../lib/queries/user";
import { ChatView } from "../../../views/chat/chat-view";

export const metadata = { title: "AI Buddy — Grove Companion" };

export default async function ChatPage() {
  const [{ userName, userAvatarSrc }, initialMessages] = await Promise.all([
    getUserContext(),
    getActiveConversationMessages(),
  ]);
  return (
    <ChatView userName={userName} userAvatarSrc={userAvatarSrc} initialMessages={initialMessages} />
  );
}
