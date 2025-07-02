/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito_400Regular"],
        nunitoBold: ["Nunito_700Bold"],
      },
      colors: {
        exact: "var(--color-exact)",
        close: "var(--color-close)",
        missing: "var(--color-missing)",
        unknown: "var(--color-unknown)",
        exactBorder: "var(--color-exactBorder)",
        closeBorder: "var(--color-closeBorder)",
        missingBorder: "var(--color-missingBorder)",
        unknownBorder: "var(--color-unknownBorder)",
        invalid: "var(--color-invalid)",
        text: "var(--color-text)",
        background: "var(--color-background)",
        backgroundLighter: "var(--color-backgroundLighter)",
        backgroundLightest: "var(--color-backgroundLightest)",
        menuBackground: "var(--color-menuBackground)",
      },
    },
  },
  plugins: [],
};
