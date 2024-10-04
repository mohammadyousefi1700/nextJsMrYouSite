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
      },
      backgroundColor: {
        gladiatorYellow: "#fffb00",
        redButton: "#ef4056",
      },
      textColor: {
        gladiatorYellow: "#fffb00",
      },
      borderColor: {
        gladiatorYellow: "#fffb00",
      },
      boxShadowColor: {
        gladiatorYellow: "#fffb00",
      },

      screens: {
        // xs برای موبایل (200px تا 490px)
        xs: { min: "200px", max: "490px" },

        // sm (490px تا 700px)
        sm: { min: "490px", max: "700px" },

        // md (700px تا 1000px)
        md: { min: "700px", max: "1000px" },

        // lg (1000px تا 1500px)
        lg: { min: "1000px", max: "1500px" },

        // xl (1500px به بالا)
        xl: { min: "1500px" },
      },
    },
  },
  plugins: [],
};

export default config;
