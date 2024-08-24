import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={ DarkTheme }>
      <Stack screenOptions={{headerTitleAlign: "center"}}>
        <Stack.Screen name="index" options={{title: "Word Game"}}/>
        <Stack.Screen name="1" options={{title: ""}} />
        <Stack.Screen name="2" options={{title: ""}} />
        <Stack.Screen name="4" options={{title: ""}} />
        <Stack.Screen name="how-to-play" options={{title: "How to play"}} />
        <Stack.Screen name="stats" options={{title: "Stats"}} />
      </Stack>
    </ThemeProvider>
  );
}
