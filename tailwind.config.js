/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D1D1D",
        secondary: "#D7D7D7",
        tertiary: "#1D1D1D",
        main_bg: "#131313",
      },
    },
  },
  plugins: [],
};
