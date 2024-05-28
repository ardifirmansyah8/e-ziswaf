import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "grey-1": "#E4E4E4",
        "grey-2": "#4E4E4E",
        "grey-3": "#F4F4F4",
        "green-1": "#45AF63",
        "green-2": "#DAEFE0",
        "blue-1": "#005596",
      },
    },
  },
  plugins: [],
};
export default config;
