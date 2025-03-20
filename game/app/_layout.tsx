import { ActivityIndicator } from "react-native";

import Menu from "@/components/Menu";
import gameStore from "@/store";
import { Nunito_400Regular, useFonts } from "@expo-google-fonts/nunito";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={gameStore}>
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
