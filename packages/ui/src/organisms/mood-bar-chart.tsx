const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type MoodBarChartProps = {
  /** 7 values, one per day (Mon–Sun). Use 0 for days with no entry. */
  data: number[];
  className?: string;
};

export function MoodBarChart({ data, className = "" }: MoodBarChartProps) {
  const max = 5;

  return (
    <div
      className={["flex items-end gap-2 h-24", className].filter(Boolean).join(" ")}
      role="img"
      aria-label="Weekly mood chart"
    >
      {DAY_LABELS.map((label, i) => {
        const value = data[i] ?? 0;
        const heightPct = value > 0 ? (value / max) * 100 : 0;

        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full flex-1 flex items-end">
              <div
                className="w-full rounded-t-full transition-all duration-300"
                style={{
                  height: `${heightPct}%`,
                  minHeight: value > 0 ? "4px" : "0",
                  backgroundColor: value > 0 ? "#bace97" : "#e9e8e5",
                }}
              />
            </div>
            <span className="font-body text-xs text-on-surface-variant">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
