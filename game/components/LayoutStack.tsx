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
      <Stack.Screen name="index" options={{ title: "Word Game" }} />
      <Stack.Screen name="[num]" options={{ title: "" }} />
      <Stack.Screen name="how-to-play" options={{ title: "How to play" }} />
      <Stack.Screen name="stats" options={{ title: "Stats" }} />
    </Stack>
  );
});
