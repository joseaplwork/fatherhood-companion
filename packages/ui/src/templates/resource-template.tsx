import type { ReactNode } from "react";

type ResourceTemplateProps = {
  sidebar: ReactNode;
  grid: ReactNode;
  savedPanel?: ReactNode;
};

export function ResourceTemplate({ sidebar, grid, savedPanel }: ResourceTemplateProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">{sidebar}</aside>
      <main className="flex-1 overflow-y-auto px-8 py-8">{grid}</main>
      {savedPanel && (
        <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{savedPanel}</aside>
      )}
    </div>
  );
}
