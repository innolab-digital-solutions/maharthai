import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
