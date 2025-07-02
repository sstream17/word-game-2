import { vars } from "nativewind";

interface IThemeColors {
  exact: string;
  close: string;
  missing: string;
  unknown: string;
  exactBorder: string;
  closeBorder: string;
  missingBorder: string;
  unknownBorder: string;
  invalid: string;
  text: string;
  background: string;
  backgroundLighter: string;
  backgroundLightest: string;
  menuBackground: string;
}

type CSSVarTheme<T extends Record<keyof IThemeColors, string>> = {
  [K in keyof T as `--color-${string & K}`]: string;
};

type ThemeVars = CSSVarTheme<IThemeColors>;

export const colors: { light: IThemeColors; dark: IThemeColors } = {
  light: {
    exact: "#56b4e9",
    close: "#f0e442",
    missing: "#e6edf3",
    unknown: "#ffffff",
    exactBorder: "#56b4e9",
    closeBorder: "#a89f2e",
    missingBorder: "#e6edf3",
    unknownBorder: "#ffffff",
    invalid: "#f33e48",
    text: "#000000de",
    background: "#cad8e4",
    backgroundLighter: "#cedce8",
    backgroundLightest: "rgba(255, 255, 255, 0.75)",
    menuBackground: "#ffffff",
  },
  dark: {
    exact: "hsl(202, 40%, 63%)",
    close: "hsl(208, 25%, 30%)",
    missing: "hsl(208, 30%, 13%)",
    unknown: "hsl(208, 20%, 17%)",
    exactBorder: "hsl(202, 40%, 63%)",
    closeBorder: "hsl(56, 50%, 60%)",
    missingBorder: "hsl(208, 30%, 13%)",
    unknownBorder: "hsl(208, 20%, 17%)",
    text: "#ffffffde",
    invalid: "hsl(357, 60%, 60%)",
    background: "hsl(208, 33%, 9%)",
    backgroundLighter: "hsl(208, 36%, 11%)",
    backgroundLightest: "rgba(29, 33, 36, 0.749)",
    menuBackground: "hsl(208, 20%, 22%)",
  },
};

export const themes = {
  light: vars<ThemeVars>({
    "--color-exact": colors.light.exact,
    "--color-close": colors.light.close,
    "--color-missing": colors.light.missing,
    "--color-unknown": colors.light.unknown,
    "--color-exactBorder": colors.light.exactBorder,
    "--color-closeBorder": colors.light.closeBorder,
    "--color-missingBorder": colors.light.missingBorder,
    "--color-unknownBorder": colors.light.unknownBorder,
    "--color-invalid": colors.light.invalid,
    "--color-text": colors.light.text,
    "--color-background": colors.light.background,
    "--color-backgroundLighter": colors.light.backgroundLighter,
    "--color-backgroundLightest": colors.light.backgroundLightest,
    "--color-menuBackground": colors.light.menuBackground,
  }),
  dark: vars<ThemeVars>({
    "--color-exact": colors.dark.exact,
    "--color-close": colors.dark.close,
    "--color-missing": colors.dark.missing,
    "--color-unknown": colors.dark.unknown,
    "--color-exactBorder": colors.dark.exactBorder,
    "--color-closeBorder": colors.dark.closeBorder,
    "--color-missingBorder": colors.dark.missingBorder,
    "--color-unknownBorder": colors.dark.unknownBorder,
    "--color-text": colors.dark.text,
    "--color-invalid": colors.dark.invalid,
    "--color-background": colors.dark.background,
    "--color-backgroundLighter": colors.dark.backgroundLighter,
    "--color-backgroundLightest": colors.dark.backgroundLightest,
    "--color-menuBackground": colors.dark.menuBackground,
  }),
};
