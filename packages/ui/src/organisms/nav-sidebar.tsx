import { Avatar } from "../atoms/avatar";
import { Icon } from "../atoms/icon";
import { NavItem } from "../molecules/nav-item";

type NavLink = {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
};

type NavSidebarProps = {
  links: NavLink[];
  userName?: string;
  userAvatarSrc?: string | null;
  logoSrc?: string;
  onSignOut?: () => void;
  className?: string;
};

export function NavSidebar({
  links,
  userName = "",
  userAvatarSrc,
  logoSrc,
  onSignOut,
  className = "",
}: NavSidebarProps) {
  return (
    <nav
      className={["glass-panel flex h-full w-64 shrink-0 flex-col gap-1 px-3 py-6", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Logo */}
      <div className="flex items-center gap-1 px-4 pb-6">
        {logoSrc && <img src={logoSrc} alt="" className="h-12 w-auto" />}
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-lg font-semibold text-primary">Grove</span>
          <span className="font-body text-sm text-secondary">Companion</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {links.map((link) => (
          <NavItem
            key={link.href}
            icon={link.icon}
            label={link.label}
            href={link.href}
            active={link.active}
          />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-3 rounded-full px-4 py-3">
        <Avatar src={userAvatarSrc} name={userName} size="sm" />
        <span className="flex-1 truncate font-body text-sm font-medium text-on-surface">
          {userName}
        </span>
        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            aria-label="Sign out"
            className="text-on-surface-variant hover:text-on-surface transition-colors duration-150"
          >
            <Icon name="logout" size={20} />
          </button>
        )}
      </div>
    </nav>
  );
}
