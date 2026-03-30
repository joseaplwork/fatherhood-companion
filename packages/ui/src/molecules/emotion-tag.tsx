const EMOTION_COLORS: Record<string, string> = {
  JOYFUL: "bg-primary-fixed text-on-primary-fixed",
  REFLECTIVE: "bg-tertiary-fixed text-on-tertiary-fixed",
  ANXIOUS: "bg-error-container text-on-error-container",
  GRATEFUL: "bg-secondary-fixed text-on-secondary-container",
  LONELY: "bg-surface-container-highest text-on-surface-variant",
  HOPEFUL: "bg-primary-fixed-dim text-on-primary-fixed",
  FRUSTRATED: "bg-error-container text-on-error-container",
  PROUD: "bg-primary-fixed text-on-primary-fixed",
};

type EmotionTagProps = {
  emotion: string;
  className?: string;
};

export function EmotionTag({ emotion, className = "" }: EmotionTagProps) {
  const colorClass =
    EMOTION_COLORS[emotion.toUpperCase()] ?? "bg-surface-container text-on-surface-variant";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1",
        "font-body text-xs font-semibold tracking-wide uppercase",
        colorClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {emotion}
    </span>
  );
}
