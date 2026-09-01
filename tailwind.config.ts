import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1F3F",
          950: "#061225",
          900: "#0A1F3F",
          800: "#11294E",
          700: "#1B3660",
          600: "#2A4675",
          500: "#3D598A",
          300: "#8FA3C2",
          200: "#B7C4D9",
          100: "#DAE1EC",
        },
        gold: {
          DEFAULT: "#C5A55A",
          700: "#9A7E3C",
          600: "#B08F42",
          500: "#C5A55A",
          400: "#D3BA80",
          300: "#E1CFA6",
          200: "#EDE2C7",
        },
        paper: {
          DEFAULT: "#FBFAF7",
          tint: "#F1F0EA",
          deep: "#E9E7DE",
        },
        ivory: "#F6F3EA",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "'Times New Roman'", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Display scale tuned for the serif
        "display-xl": ["clamp(2.75rem, 2rem + 3.4vw, 4.75rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.012em" }],
        "display-md": ["clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.35rem, 1.2rem + 0.7vw, 1.65rem)", { lineHeight: "1.25", letterSpacing: "-0.008em" }],
      },
      maxWidth: {
        edge: "72.5rem",
        prose: "42rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        note: "0 1px 2px rgba(10, 31, 63, 0.05), 0 12px 40px -12px rgba(10, 31, 63, 0.18)",
        "note-deep": "0 2px 4px rgba(10, 31, 63, 0.06), 0 24px 64px -20px rgba(10, 31, 63, 0.28)",
        lift: "0 1px 2px rgba(10, 31, 63, 0.04), 0 16px 48px -16px rgba(10, 31, 63, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
