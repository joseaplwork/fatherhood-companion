import type { EventKind, RsvpStatus } from "@fatherhood-companion/domain";
import { Icon } from "../atoms/icon";

const RSVP_LABELS: Record<RsvpStatus, string> = {
  GOING: "Going",
  MAYBE: "Maybe",
  NOT_GOING: "Can't go",
};

type EventCardProps = {
  title: string;
  description?: string;
  startAt: string;
  location?: string;
  kind: EventKind;
  rsvpStatus?: RsvpStatus | null;
  attendeeCount?: number;
  onClick?: () => void;
  className?: string;
};

export function EventCard({
  title,
  description,
  startAt,
  location,
  kind,
  rsvpStatus,
  attendeeCount,
  onClick,
  className = "",
}: EventCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-2xl bg-surface-container-low px-5 py-4 text-left",
        "transition-colors duration-150 hover:bg-surface-container",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Kind badge */}
      <span
        className={[
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2",
          kind === "VIRTUAL" ? "bg-tertiary-fixed text-tertiary" : "bg-primary-fixed text-primary",
        ].join(" ")}
      >
        <Icon name={kind === "VIRTUAL" ? "videocam" : "location_on"} size={12} fill />
        <span className="font-body text-xs font-medium">
          {kind === "VIRTUAL" ? "Virtual" : "In Person"}
        </span>
      </span>

      {/* Title */}
      <h3 className="font-display text-base font-semibold text-on-surface mb-1">{title}</h3>

      {/* Date & location */}
      <div className="flex items-center gap-1 mb-1">
        <Icon name="calendar_today" size={14} className="text-on-surface-variant" />
        <span className="font-body text-xs text-on-surface-variant">{startAt}</span>
      </div>
      {location && (
        <div className="flex items-center gap-1 mb-2">
          <Icon name="location_on" size={14} className="text-on-surface-variant" />
          <span className="font-body text-xs text-on-surface-variant truncate">{location}</span>
        </div>
      )}

      {description && (
        <p className="font-body text-sm text-on-surface-variant line-clamp-2 mb-3">{description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center gap-3">
        {rsvpStatus && (
          <span className="font-body text-xs font-medium text-primary">
            {RSVP_LABELS[rsvpStatus]}
          </span>
        )}
        {attendeeCount !== undefined && (
          <div className="flex items-center gap-1 text-on-surface-variant ml-auto">
            <Icon name="group" size={14} />
            <span className="font-body text-xs">{attendeeCount} attending</span>
          </div>
        )}
      </div>
    </button>
  );
}
