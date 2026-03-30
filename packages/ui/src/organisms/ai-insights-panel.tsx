import { Icon } from "../atoms/icon";
import { MetricChip } from "../molecules/metric-chip";

type Metric = {
  label: string;
  value: string;
  trend?: "up" | "down" | "stable";
};

type AIInsightsPanelProps = {
  title?: string;
  insight?: string;
  metrics?: Metric[];
  className?: string;
};

export function AIInsightsPanel({
  title = "AI Insights",
  insight,
  metrics = [],
  className = "",
}: AIInsightsPanelProps) {
  return (
    <div
      className={["ai-glow relative rounded-2xl bg-surface-container-low px-5 py-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-fixed">
          <Icon name="auto_awesome" size={16} className="text-primary" fill />
        </div>
        <span className="font-display text-sm font-semibold text-on-surface">{title}</span>
      </div>

      {/* Insight text */}
      {insight && (
        <p className="font-body text-sm text-on-surface-variant mb-3 leading-relaxed">{insight}</p>
      )}

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metrics.map((m) => (
            <MetricChip key={m.label} label={m.label} value={m.value} trend={m.trend} />
          ))}
        </div>
      )}
    </div>
  );
}
