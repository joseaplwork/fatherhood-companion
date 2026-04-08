import type { ReactNode } from "react";

type CommunityTemplateProps = {
  feed: ReactNode;
  rightPanel?: ReactNode;
};

export function CommunityTemplate({ feed, rightPanel }: CommunityTemplateProps) {
  return (
    <>
      <main className="flex-1 overflow-y-auto px-8 py-8">{feed}</main>
      {rightPanel && (
        <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{rightPanel}</aside>
      )}
    </>
  );
}
