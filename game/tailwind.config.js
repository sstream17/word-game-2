/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito_400Regular"],
        nunitoBold: ["Nunito_700Bold"],
      },
      colors: {
        exact: {
          dark: "var(--color-exact-dark)",
          default: "var(--color-exact-light)",
        },
        close: {
          dark: "var(--color-close-dark)",
          default: "var(--color-close-light)",
        },
        missing: {
          dark: "var(--color-missing-dark)",
          default: "var(--color-missing-light)",
        },
        unknown: {
          dark: "var(--color-unknown-dark)",
          default: "var(--color-unknown-light)",
        },
        exactBorder: {
          dark: "var(--color-exactBorder-dark)",
          default: "var(--color-exactBorder-light)",
        },
        closeBorder: {
          dark: "var(--color-closeBorder-dark)",
          default: "var(--color-closeBorder-light)",
        },
        missingBorder: {
          dark: "var(--color-missingBorder-dark)",
          default: "var(--color-missingBorder-light)",
        },
        unknownBorder: {
          dark: "var(--color-unknownBorder-dark)",
          default: "var(--color-unknownBorder-light)",
        },
        text: {
          dark: "var(--color-text-dark)",
          default: "var(--color-text-light)",
        },
        invalid: {
          dark: "var(--color-invalid-dark)",
          default: "var(--color-invalid-light)",
        },
        background: {
          dark: "var(--color-background-dark)",
          default: "var(--color-background-light)",
        },
        backgroundLighter: {
          dark: "var(--color-backgroundLighter-dark)",
          default: "var(--color-backgroundLighter-light)",
        },
        backgroundLightest: {
          dark: "var(--color-backgroundLightest-dark)",
          default: "var(--color-backgroundLightest-light)",
        },
      },
    },
  },
  plugins: [],
};
