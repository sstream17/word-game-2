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
    "--color-exact": "#56b4e9",
    "--color-close": "#f0e442",
    "--color-missing": "#e6edf3",
    "--color-unknown": "#ffffff",
    "--color-exactBorder": "#56b4e9",
    "--color-closeBorder": "#a89f2e",
    "--color-missingBorder": "#e6edf3",
    "--color-unknownBorder": "#ffffff",
    "--color-invalid": "#f33e48",
    "--color-text": "#000000de",
    "--color-background": "#cad8e4",
    "--color-backgroundLighter": "#cedce8",
    "--color-backgroundLightest": "rgba(255, 255, 255, 0.75)",
  }),
  dark: vars({
    "--color-exact": "hsl(202, 40%, 63%)",
    "--color-close": "hsl(208, 25%, 30%)",
    "--color-missing": "hsl(208, 30%, 13%)",
    "--color-unknown": "hsl(208, 20%, 17%)",
    "--color-exactBorder": "hsl(202, 40%, 63%)",
    "--color-closeBorder": "hsl(56, 50%, 60%)",
    "--color-missingBorder": "hsl(208, 30%, 13%)",
    "--color-unknownBorder": "hsl(208, 20%, 17%)",
    "--color-text": "#ffffffde",
    "--color-invalid": "hsl(357, 60%, 60%)",
    "--color-background": "hsl(208, 33%, 9%)",
    "--color-backgroundLighter": "hsl(208, 36%, 11%)",
    "--color-backgroundLightest": "rgba(29, 33, 36, 0.749)",
  }),
};
