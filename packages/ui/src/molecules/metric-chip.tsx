type TrendDirection = "up" | "down" | "stable";

type MetricChipProps = {
  label: string;
  value: string;
  trend?: TrendDirection;
  className?: string;
};

const trendConfig: Record<TrendDirection, { icon: string; color: string }> = {
  up: { icon: "↑", color: "text-primary" },
  down: { icon: "↓", color: "text-error" },
  stable: { icon: "→", color: "text-on-surface-variant" },
};

export function MetricChip({ label, value, trend = "stable", className = "" }: MetricChipProps) {
  const { icon, color } = trendConfig[trend];

  return (
    <div
      className={["flex flex-col gap-0.5 rounded-2xl bg-surface-container-low px-4 py-3", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="font-body text-xs text-on-surface-variant">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-lg font-semibold text-on-surface">{value}</span>
        <span className={["font-body text-xs font-medium", color].join(" ")}>{icon}</span>
      </div>
    </div>
  );
}
