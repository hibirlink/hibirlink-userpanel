/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
    "Error.{js,ts,vue}",
    "error.{js,ts,vue}",
    "content/**/*.md",
  ],
  darkMode: "class",
  theme: {
    extend: {
      lineClamp: {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      colors: {
        green100: "#051509",
        green200: "#22292A",
        green300: "#4EAF60",
        green400: "#56B855",
        green500: "#46D26C",
        green600: "#62D981",
        green700: "#7DE393",
        green800: "#D3F5CE",
        green900: "#E6F2EE",
        green1000: "#F7FEEF",
        green1100: "#FFFFFF",
        lemon: "#8DCC7B",
        orange: "#FFA046",
        red: "#FE6845",
        gray: "#555C5D",
        "gray-light": "#C2C2C2",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      // fontSize: {
      //   sm: '0.8rem',

      //   base: '1rem',
      //   xl: '1.25rem',
      //   2xl: '1.563rem',
      //   3xl: '1.953rem',
      //   4xl: '2.441rem',
      //   5xl: '3.052rem',
      // },
      screens: {
        xs: "512px",
        // => @media (min-width: 512px) { ... }
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
        "3xl": "1600px",
        // => @media (min-width: 1600px) { ... }
        "4xl": "1920px",
        // => @media (min-width: 1920px) { ... }
      },
      backgroundImage: {
        image: "url('/4.svg')",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        fill: "100vw",
        fit: "115wh",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translate(-6px)" },
          "50%": { transform: "translate(8px)" },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"),
  ],
};
