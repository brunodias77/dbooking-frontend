import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green_banner: "rgba(36, 171, 112, 0.04)",
        green_500: "#24AB70",

        gray_200: "#E8E8E8",
        gray_300: "#555555",
        gray_800: "#2d2e32",
        gray_900: "#25262a",
      },
    },
  },
  plugins: [],
};
export default config;
