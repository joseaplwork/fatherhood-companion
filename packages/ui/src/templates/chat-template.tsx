import type { ReactNode } from "react";

type ChatTemplateProps = {
  conversationList: ReactNode;
  thread: ReactNode;
  metaPanel?: ReactNode;
};

export function ChatTemplate({ conversationList, thread, metaPanel }: ChatTemplateProps) {
  return (
    <>
      <aside className="w-72 shrink-0 overflow-y-auto border-r border-outline-variant/15 py-6">
        {conversationList}
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden">{thread}</main>
      {metaPanel && <aside className="w-72 shrink-0 overflow-y-auto px-4 py-6">{metaPanel}</aside>}
    </>
  );
}
