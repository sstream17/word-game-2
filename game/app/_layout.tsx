import { ActivityIndicator } from "react-native";

import Menu from "@/components/Menu";
import gameStore from "@/store";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={gameStore}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerTitleStyle: {
            fontFamily: "Nunito_700Bold",
          },
          headerTitleAlign: "center",
          headerRight: () => <Menu />,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Word Game" }} />
        <Stack.Screen name="[num]" options={{ title: "" }} />
        <Stack.Screen name="how-to-play" options={{ title: "How to play" }} />
        <Stack.Screen name="stats" options={{ title: "Stats" }} />
      </Stack>
    </Provider>
  );
}
