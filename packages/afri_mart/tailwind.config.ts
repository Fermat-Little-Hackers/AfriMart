import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        smx: { max: "645px" },
        lmx: { max: "1227px" },
        xlg: { max: "1431px" },
        mmx: { max: "1430px" },
      },
    },
  },
  plugins: [],
};
export default config;
