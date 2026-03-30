import { Icon } from "../atoms/icon";

type NotificationItemProps = {
  title: string;
  body: string;
  time: string;
  isRead?: boolean;
  iconName?: string;
  onClick?: () => void;
};

export function NotificationItem({
  title,
  body,
  time,
  isRead = false,
  iconName = "notifications",
  onClick,
}: NotificationItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left",
        "transition-colors duration-150 hover:bg-surface-container-low",
        isRead ? "opacity-60" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed">
        <Icon name={iconName} size={20} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-semibold text-on-surface truncate">{title}</p>
        <p className="font-body text-xs text-on-surface-variant line-clamp-2">{body}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="font-body text-xs text-on-surface-variant">{time}</span>
        {!isRead && <span className="h-2 w-2 rounded-full bg-primary-container" />}
      </div>
    </button>
  );
}
