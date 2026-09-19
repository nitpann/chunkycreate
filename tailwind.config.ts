import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16160F",
        paper: "#FAF9F5",
        graphite: "#6E6D63",
        line: "#E4E1D6",
        surface: "#F1EFE7",
        mustard: {
          DEFAULT: "#D9A234",
          dark: "#B8811F",
          light: "#F1D69A"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      maxWidth: {
        content: "1200px"
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "14px"
      }
    }
  },
  plugins: []
};

export default config;
