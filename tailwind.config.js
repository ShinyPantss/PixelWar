/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222222",
        input: "#363636",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
      },
      fontFamily: {
        pextralight: ["SpectralSC-ExtraLight", "sans-serif"],
        plight: ["SpectralSC-Light", "sans-serif"],
        pregular: ["SpectralSC-Regular", "sans-serif"],
        pmedium: ["SpectralSC-Medium", "sans-serif"],
        psemibold: ["SpectralSC-SemiBold", "sans-serif"],
        pbold: ["SpectralSC-Bold", "sans-serif"],
        pextrabold: ["SpectralSC-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
