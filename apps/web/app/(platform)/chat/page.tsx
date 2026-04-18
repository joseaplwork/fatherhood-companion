import { getActiveConversationMessages } from "../../../lib/queries/chat";
import { getSession } from "../../../lib/session";
import { ChatView } from "../../../views/chat/chat-view";

export const metadata = { title: "AI Buddy — Grove Companion" };

export default async function ChatPage() {
  const [session, initialMessages] = await Promise.all([
    getSession(),
    getActiveConversationMessages(),
  ]);

  return (
    <ChatView
      userName={session.userName}
      userAvatarSrc={session.userAvatarSrc}
      initialMessages={initialMessages}
    />
  );
}
