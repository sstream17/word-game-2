import Menu from "@/components/Menu";
import gameState from "@/store";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={gameState}>
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
    </Provider>
  );
}
