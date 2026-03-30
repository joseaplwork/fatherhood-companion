import { Icon } from "../atoms/icon";

type ToneSyncBadgeProps = {
  tone: string;
  className?: string;
};

export function ToneSyncBadge({ tone, className = "" }: ToneSyncBadgeProps) {
  return (
    <div
      className={[
        "inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon name="tune" size={14} className="text-secondary" />
      <span className="font-body text-xs font-medium text-on-secondary-container">
        Tone Sync · {tone}
      </span>
    </div>
  );
}
