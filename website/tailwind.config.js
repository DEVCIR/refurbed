/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        pri: ["Readex Pro", "sans-serif"],
        sec: ["Poppins", "sans-serif"],
      },
      colors: {
        customPri: "#332D82",
        customPriLight: "#593BCE",
        customPriLighter: "#DCC1F9",
        customBg1: "#FFFFFF",
        customBg2: "#F6F6FF",
        customAccent: "#036659",
        customDarkText: "#191919",
        customLightText: "#FFFFFF",
        customGreyText: "#989898",
      },
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          width: '100%',
          maxWidth: '1250px',
          paddingRight: '16px',
          paddingLeft: '16px',
          [`@media (min-width: ${theme("screens.md")})`]: {
            paddingRight: "32px",
            paddingLeft: "32px",
          },
          [`@media (min-width: ${theme("screens.lg")})`]: {
            paddingRight: "52px",
            paddingLeft: "52px",
          },
        },
      });
    },
  ],
}