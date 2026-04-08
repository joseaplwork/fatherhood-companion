import type { ReactNode } from "react";

type DiaryTemplateProps = {
  entryList: ReactNode;
  aiPanel?: ReactNode;
};

export function DiaryTemplate({ entryList, aiPanel }: DiaryTemplateProps) {
  return (
    <>
      <main className="flex-1 overflow-y-auto px-8 py-8">{entryList}</main>
      {aiPanel && <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{aiPanel}</aside>}
    </>
  );
}
