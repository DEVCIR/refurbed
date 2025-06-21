/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        pri: ["Readex Pro", "sans-serif"],
        sec: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        paytone: ['"Paytone One"', "sans-serif"],
      },
      colors: {
        "custom-pri": "#332D82",
        "custom-pri-light": "#593BCE",
        "custom-pri-lighter": "#DCC1F9",
        "custom-bg1": "#FFFFFF",
        "custom-bg2": "#F6F6FF",
        "custom-accent": "#036659",
        "custom-dark-text": "#191919",
        "custom-light-text": "#FFFFFF",
        "custom-grey-text": "#989898",
        "refurbed-blue": "#2F4FDD", // or from CSS in screenshot: rgb(47, 48, 97)

        // Sustainability page colors
        "sustainability-primary": "#2d8a7a",
        "sustainability-accent": "#7ed321",
        "sustainability-accent-hover": "#6bc91a",
        "sustainability-highlight": "#e4edd7",
        "sustainability-dark": "#006356",
        "sustainability-light": "#f1ffde",
        "sustainability-purple": "#4a4a8a",
        "sustainability-purple-hover": "#3a3a7a",
        "sustainability-green": "#80FF80",
        "sustainability-green-hover": "#22c55e",
        "sustainability-beige": "#f5f5dc",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          width: "100%",
          maxWidth: "1250px",
          paddingRight: "16px",
          paddingLeft: "16px",
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
};
