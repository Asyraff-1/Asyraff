import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "slate-950",
        emerald: {
          500: "#10b981",
        },
        cyan: {
          500: "#06b6d4",
        }
      },
    },
  },
  plugins: [],
};
export default config;
