import type { ReactionType } from "@/grove-companion/domain";

import { Avatar } from "../atoms/avatar";
import { Icon } from "../atoms/icon";

const REACTION_ICONS: Record<ReactionType, string> = {
  HEART: "favorite",
  SUPPORT: "handshake",
  HELPFUL: "thumb_up",
};

type Reaction = {
  type: ReactionType;
  count: number;
};

type PostCardProps = {
  title: string;
  content: string;
  authorName: string;
  authorAvatarSrc?: string | null;
  createdAt: string;
  replyCount?: number;
  reactions?: Reaction[];
  isPinned?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
  className?: string;
};

export function PostCard({
  title,
  content,
  authorName,
  authorAvatarSrc,
  createdAt,
  replyCount = 0,
  reactions = [],
  isPinned = false,
  isLocked = false,
  onClick,
  className = "",
}: PostCardProps) {
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
      {/* Pinned / locked badges */}
      {(isPinned || isLocked) && (
        <div className="flex gap-1.5 mb-2">
          {isPinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-2 py-0.5">
              <Icon name="push_pin" size={12} className="text-primary" fill />
              <span className="font-body text-xs font-medium text-primary">Pinned</span>
            </span>
          )}
          {isLocked && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary-fixed px-2 py-0.5">
              <Icon name="lock" size={12} className="text-secondary" fill />
              <span className="font-body text-xs font-medium text-secondary">Locked</span>
            </span>
          )}
        </div>
      )}

      {/* Author row */}
      <div className="flex items-center gap-2 mb-2">
        <Avatar src={authorAvatarSrc} name={authorName} size="sm" />
        <span className="font-body text-xs font-medium text-on-surface-variant">{authorName}</span>
        <span className="font-body text-xs text-on-surface-variant ml-auto">{createdAt}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-base font-semibold text-on-surface mb-1">{title}</h3>

      {/* Content preview */}
      <p className="font-body text-sm text-on-surface-variant line-clamp-3 mb-3">{content}</p>

      {/* Footer */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-on-surface-variant">
          <Icon name="chat_bubble_outline" size={16} />
          <span className="font-body text-xs">{replyCount}</span>
        </div>
        {reactions.map((r) => (
          <div key={r.type} className="flex items-center gap-1 text-on-surface-variant">
            <Icon name={REACTION_ICONS[r.type]} size={16} />
            <span className="font-body text-xs">{r.count}</span>
          </div>
        ))}
      </div>
    </button>
  );
}
