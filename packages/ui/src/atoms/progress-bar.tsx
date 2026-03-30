type ProgressBarProps = {
  value: number; // 0-100
  className?: string;
  label?: string;
};

export function ProgressBar({ value, className = "", label }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={["w-full h-2 rounded-full bg-surface-container-high overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="h-full rounded-full bg-primary-fixed-dim transition-all duration-500"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
