type BadgeVariant = "default" | "selected" | "error" | "secondary";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-container-high text-on-surface-variant",
  selected: "bg-primary-container text-on-primary-container",
  error: "bg-error-container text-on-error-container",
  secondary: "bg-secondary-fixed text-on-secondary-container",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1",
        "font-body text-xs font-medium",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
