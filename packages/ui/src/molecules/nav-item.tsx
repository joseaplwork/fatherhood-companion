import { Icon } from "../atoms/icon";

type NavItemProps = {
  icon: string;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
};

export function NavItem({ icon, label, active = false, href, onClick }: NavItemProps) {
  const classes = [
    "flex items-center gap-3 rounded-full px-4 py-3 w-full",
    "font-body text-sm font-medium transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    active
      ? "bg-primary-container text-on-primary-container"
      : "text-on-surface-variant hover:bg-surface-container-low",
  ].join(" ");

  const content = (
    <>
      <Icon name={icon} size={24} fill={active} />
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
