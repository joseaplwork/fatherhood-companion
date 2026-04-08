import type { ReactNode } from "react";

type DashboardTemplateProps = {
  main: ReactNode;
  aiPanel?: ReactNode;
};

export function DashboardTemplate({ main, aiPanel }: DashboardTemplateProps) {
  return (
    <>
      <main className="flex-1 overflow-y-auto px-8 py-8">{main}</main>
      {aiPanel && <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{aiPanel}</aside>}
    </>
  );
}
