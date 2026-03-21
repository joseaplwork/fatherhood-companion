import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren,
} from "react";

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: "primary" | "secondary";
  }
>;

const baseStyles: CSSProperties = {
  border: "none",
  borderRadius: 999,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  fontSize: "0.95rem",
  fontWeight: 700,
  lineHeight: 1,
  padding: "0.9rem 1.3rem",
  transition: "transform 120ms ease, box-shadow 120ms ease",
};

const toneStyles: Record<NonNullable<ButtonProps["tone"]>, CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
    boxShadow: "0 10px 24px rgba(15, 118, 110, 0.22)",
    color: "#f8fafc",
  },
  secondary: {
    background: "#ffffff",
    boxShadow: "inset 0 0 0 1px rgba(15, 23, 42, 0.12)",
    color: "#0f172a",
  },
};

export function Button({
  children,
  tone = "primary",
  style,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        ...baseStyles,
        ...toneStyles[tone],
        ...style,
      }}
      type={type}
    >
      {children}
    </button>
  );
}
