/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { vars } from "nativewind";

const keyColors = {
  exact: "#56b4e9",
  close: "#f0e442",
  missing: "#e6edf3",
  unknown: "#ffffff",
  exactBorder: "#56b4e9",
  closeBorder: "#a89f2e",
  missingBorder: "#e6edf3",
  unknownBorder: "#ffffff",
};

export const Colors = {
  light: {
    text: "#11181C",
    invalid: "#f33e48",
    background: "#cad8e4",
    backgroundLighter: "#cedce8",
    backgroundLightest: "#ffffff",
    ...keyColors,
  },
  dark: {
    text: "#ECEDEE",
    invalid: "#d65c62",
    background: "#151718",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    ...keyColors,
  },
};

export const themes = {
  light: vars({
    "--color-exact-light": "#56b4e9",
    "--color-close-light": "#f0e442",
    "--color-missing-light": "#e6edf3",
    "--color-unknown-light": "#ffffff",
    "--color-exactBorder-light": "#56b4e9",
    "--color-closeBorder-light": "#a89f2e",
    "--color-missingBorder-light": "#e6edf3",
    "--color-unknownBorder-light": "#ffffff",
    "--color-invalid-light": "#f33e48",
    "--color-text-light": "#000000de",
    "--color-background-light": "#cad8e4",
    "--color-backgroundLighter-light": "#cedce8",
    "--color-backgroundLightest-light": "rgba(255, 255, 255, 0.75)",
  }),
  dark: vars({
    "--color-exact-dark": "hsl(202, 40%, 63%)",
    "--color-close-dark": "hsl(208, 25%, 30%)",
    "--color-missing-dark": "hsl(208, 30%, 13%)",
    "--color-unknown-dark": "hsl(208, 20%, 17%)",
    "--color-exactBorder-dark": "hsl(202, 40%, 63%)",
    "--color-closeBorder-dark": "hsl(56, 50%, 60%)",
    "--color-missingBorder-dark": "hsl(208, 30%, 13%)",
    "--color-unknownBorder-dark": "hsl(208, 20%, 17%)",
    "--color-text-dark": "#ffffffde",
    "--color-invalid-dark": "hsl(357, 60%, 60%)",
    "--color-background-dark": "hsl(208, 33%, 9%)",
    "--color-backgroundLighter-dark": "hsl(208, 36%, 11%)",
    "--color-backgroundLightest-dark": "rgba(29, 33, 36, 0.749)",
  }),
};
