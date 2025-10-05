import "@/api/cssInterop";
import "../assets/global.css";

import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { LayoutStack } from "@/components/LayoutStack";
import { ThemeProvider } from "@/components/ThemeProvider";
import solverStore from "@/store";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={solverStore}>
      <ThemeProvider>
        <LayoutStack />
      </ThemeProvider>
    </Provider>
  );
}
