import type { Config } from "tailwindcss";

/**
 * Grove Companion design token config.
 * apps/web extends this via: import uiConfig from "@/grove-companion/ui/tailwind"
 *
 * Tokens derived from Stitch project 12996986170513421000 namedColors + DESIGN.md.
 */
const config: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        // --- Primary (Sage Green) ---
        primary: "#4f6034",
        "primary-container": "#67794a",
        "primary-fixed": "#d6eab1",
        "primary-fixed-dim": "#bace97",
        "on-primary": "#ffffff",
        "on-primary-container": "#f2ffd6",
        "on-primary-fixed": "#121f00",
        "on-primary-fixed-variant": "#3c4c22",
        // --- Secondary (Warm Cream) ---
        secondary: "#665d4f",
        "secondary-container": "#eadecc",
        "secondary-fixed": "#ede1cf",
        "secondary-fixed-dim": "#d0c5b4",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#6a6253",
        // --- Tertiary (Muted Mauve) ---
        tertiary: "#635762",
        "tertiary-container": "#7c6f7a",
        "tertiary-fixed": "#eedeeb",
        "tertiary-fixed-dim": "#d2c2cf",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fff8fa",
        "on-tertiary-fixed": "#281726",
        // --- Error ---
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        // --- Surfaces ---
        surface: "#faf9f6",
        "surface-dim": "#dadad7",
        "surface-bright": "#faf9f6",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f3f1",
        "surface-container": "#efeeeb",
        "surface-container-high": "#e9e8e5",
        "surface-container-highest": "#e3e2e0",
        "on-surface": "#1a1c1a",
        "on-surface-variant": "#45483e",
        // --- Outline ---
        outline: "#75786c",
        "outline-variant": "#c5c8ba",
        // --- Inverse ---
        "inverse-surface": "#2f312f",
        "inverse-on-surface": "#f1f1ee",
        "inverse-primary": "#bace97",
        "surface-tint": "#536437",
      },
      fontFamily: {
        // Display/headlines — technical, editorial (represents AI intelligence)
        display: ["Space Grotesk", "sans-serif"],
        // Body/labels — warm, human touch (represents the human connection)
        body: ["Manrope", "sans-serif"],
        // Override default sans with Manrope
        sans: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        // Matches Stitch designTheme roundness: ROUND_FULL
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        // Ambient shadow — never pure black, uses on-surface at 4% + 40px blur
        ambient: "0 40px 80px 0 rgba(26, 28, 26, 0.04)",
        // AI glow — used for floating AI elements
        "ai-glow": "0 0 24px 0 rgba(214, 234, 177, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
