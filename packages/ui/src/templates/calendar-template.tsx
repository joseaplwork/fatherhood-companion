import type { ReactNode } from "react";

type CalendarTemplateProps = {
  calendarGrid: ReactNode;
  dayDetail?: ReactNode;
  aiPanel?: ReactNode;
};

export function CalendarTemplate({ calendarGrid, dayDetail, aiPanel }: CalendarTemplateProps) {
  return (
    <>
      <main className="flex flex-1 flex-col gap-6 overflow-y-auto px-8 py-8">
        {calendarGrid}
        {dayDetail}
      </main>
      {aiPanel && <aside className="w-80 shrink-0 overflow-y-auto px-4 py-8">{aiPanel}</aside>}
    </>
  );
}
