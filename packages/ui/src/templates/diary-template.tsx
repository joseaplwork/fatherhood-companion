import type { ReactNode } from "react";

type DiaryTemplateProps = {
  sidebar: ReactNode;
  entryList: ReactNode;
  aiPanel?: ReactNode;
};

export function DiaryTemplate({ sidebar, entryList, aiPanel }: DiaryTemplateProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">{sidebar}</aside>
      <main className="flex-1 overflow-y-auto px-8 py-8">{entryList}</main>
      {aiPanel && <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{aiPanel}</aside>}
    </div>
  );
}
