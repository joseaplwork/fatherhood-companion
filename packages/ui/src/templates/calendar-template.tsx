import type { ReactNode } from "react";

type CalendarTemplateProps = {
  sidebar: ReactNode;
  calendarGrid: ReactNode;
  dayDetail?: ReactNode;
  aiPanel?: ReactNode;
};

export function CalendarTemplate({
  sidebar,
  calendarGrid,
  dayDetail,
  aiPanel,
}: CalendarTemplateProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 h-screen">{sidebar}</aside>
      <main className="flex flex-1 flex-col gap-6 overflow-y-auto px-8 py-8">
        {calendarGrid}
        {dayDetail}
      </main>
      {aiPanel && <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{aiPanel}</aside>}
    </div>
  );
}
