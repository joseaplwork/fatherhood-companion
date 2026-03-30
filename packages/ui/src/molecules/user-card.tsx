import { Avatar } from "../atoms/avatar";
import { Icon } from "../atoms/icon";

type UserCardProps = {
  name: string;
  avatarSrc?: string | null;
  location?: string;
  bio?: string;
  helpCount?: number;
  isVerified?: boolean;
  className?: string;
};

export function UserCard({
  name,
  avatarSrc,
  location,
  bio,
  helpCount,
  isVerified = false,
  className = "",
}: UserCardProps) {
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-2xl bg-surface-container-low px-4 py-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Avatar src={avatarSrc} name={name} size="lg" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-body text-sm font-semibold text-on-surface truncate">{name}</span>
          {isVerified && <Icon name="verified" size={16} className="shrink-0 text-primary" fill />}
        </div>
        {location && (
          <div className="flex items-center gap-1 mt-0.5">
            <Icon name="location_on" size={14} className="text-on-surface-variant" />
            <span className="font-body text-xs text-on-surface-variant truncate">{location}</span>
          </div>
        )}
        {bio && (
          <p className="font-body text-xs text-on-surface-variant line-clamp-2 mt-1">{bio}</p>
        )}
        {helpCount !== undefined && (
          <span className="font-body text-xs text-primary mt-1 block">Helped {helpCount} dads</span>
        )}
      </div>
    </div>
  );
}
