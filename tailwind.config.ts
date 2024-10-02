import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#CA7257'
      },
      backgroundColor: {
        'primary': '#CA7257'
      },
      boxShadow: {
        'config': '0px 4px 3px -1px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};

export default config;
