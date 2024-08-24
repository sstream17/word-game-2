import Menu from "@/components/Menu";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerRight: () => <Menu />,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Word Game" }} />
        <Stack.Screen name="[num]" options={{ title: "" }} />
        <Stack.Screen name="how-to-play" options={{ title: "How to play" }} />
        <Stack.Screen name="stats" options={{ title: "Stats" }} />
      </Stack>
    </ThemeProvider>
  );
}
