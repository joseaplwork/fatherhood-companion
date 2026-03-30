import type { ReactNode } from "react";

type DashboardTemplateProps = {
  sidebar: ReactNode;
  main: ReactNode;
  aiPanel?: ReactNode;
};

export function DashboardTemplate({ sidebar, main, aiPanel }: DashboardTemplateProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Left nav */}
      <aside className="sticky top-0 h-screen">{sidebar}</aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-8 py-8">{main}</main>

      {/* Right AI panel */}
      {aiPanel && <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{aiPanel}</aside>}
    </div>
  );
}
