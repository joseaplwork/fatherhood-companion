import type { ReactNode } from "react";

type CommunityTemplateProps = {
  sidebar: ReactNode;
  feed: ReactNode;
  rightPanel?: ReactNode;
};

export function CommunityTemplate({ sidebar, feed, rightPanel }: CommunityTemplateProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">{sidebar}</aside>
      <main className="flex-1 overflow-y-auto px-8 py-8">{feed}</main>
      {rightPanel && (
        <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{rightPanel}</aside>
      )}
    </div>
  );
}
