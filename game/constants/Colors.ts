/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

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
