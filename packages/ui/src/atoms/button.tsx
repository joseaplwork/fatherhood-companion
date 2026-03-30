import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "ai";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-container text-on-primary-container hover:opacity-90 active:opacity-80",
  secondary:
    "bg-secondary-container text-on-secondary-container hover:opacity-90 active:opacity-80",
  ghost:
    "bg-transparent text-on-surface hover:bg-surface-container-low active:bg-surface-container",
  ai: "btn-ai text-on-primary-container hover:opacity-90 active:opacity-80",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-full font-body font-medium",
        "min-h-12 min-w-12",
        "transition-opacity duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-40",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
