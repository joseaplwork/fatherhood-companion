"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../atoms/icon";
import { NotificationItem } from "../molecules/notification-item";

type NotificationData = {
  id: string;
  title: string;
  body: string;
  time: string;
  isRead?: boolean;
  iconName?: string;
};

type NotificationBellProps = {
  unreadCount?: number;
  notifications?: NotificationData[];
  onNotificationClick?: (id: string) => void;
  onMarkAllRead?: () => void;
  className?: string;
};

export function NotificationBell({
  unreadCount = 0,
  notifications = [],
  onNotificationClick,
  onMarkAllRead,
  className = "",
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={["relative", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        className={[
          "relative flex h-10 w-10 items-center justify-center rounded-full",
          "hover:bg-surface-container-high transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        ].join(" ")}
      >
        <Icon name="notifications" size={24} className="text-on-surface-variant" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-on-primary font-body text-[10px] font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="glass-panel absolute right-0 top-12 z-50 w-80 rounded-2xl shadow-ambient overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/15">
            <span className="font-display text-sm font-semibold text-on-surface">
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="font-body text-xs font-medium text-primary hover:text-primary-container transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto py-2">
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-center font-body text-sm text-on-surface-variant">
                You're all caught up!
              </p>
            ) : (
              notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  title={n.title}
                  body={n.body}
                  time={n.time}
                  isRead={n.isRead}
                  iconName={n.iconName}
                  onClick={() => {
                    onNotificationClick?.(n.id);
                    setOpen(false);
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
