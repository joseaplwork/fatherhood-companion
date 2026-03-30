import type { ReactNode } from "react";

type ChatTemplateProps = {
  sidebar: ReactNode;
  conversationList: ReactNode;
  thread: ReactNode;
  metaPanel?: ReactNode;
};

export function ChatTemplate({ sidebar, conversationList, thread, metaPanel }: ChatTemplateProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">{sidebar}</aside>
      <aside className="w-72 shrink-0 overflow-y-auto border-r border-outline-variant/15 py-6">
        {conversationList}
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden">{thread}</main>
      {metaPanel && <aside className="w-72 shrink-0 overflow-y-auto px-4 py-6">{metaPanel}</aside>}
    </div>
  );
}
