import { memo } from "react";

import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import Menu from "./Menu";
import { useThemeContext } from "./ThemeProvider";

export const LayoutStack = memo(function LayoutStack() {
  const { theme } = useThemeContext();
  const themeColors = colors[theme];

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: "Nunito_700Bold",
        },
        headerTintColor: themeColors.text,
        headerTitleAlign: "center",
        headerRight: () => <Menu />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Word Game Solver" }} />
    </Stack>
  );
});
