type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  className?: string;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ src, name = "", size = "md", className = "" }: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={["rounded-full object-cover", sizeClass, className].filter(Boolean).join(" ")}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={[
        "flex items-center justify-center rounded-full",
        "bg-primary-container text-on-primary-container font-body font-semibold",
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {getInitials(name)}
    </div>
  );
}
