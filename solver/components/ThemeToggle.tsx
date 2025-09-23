import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import DarkTheme from "@/assets/images/theme_dark_icon.svg";
import DarkThemeOutline from "@/assets/images/theme_dark_outline_icon.svg";
import LightTheme from "@/assets/images/theme_light_icon.svg";
import LightThemeOutline from "@/assets/images/theme_light_outline_icon.svg";
import SystemTheme from "@/assets/images/theme_system_icon.svg";
import SystemThemeOutline from "@/assets/images/theme_system_outline_icon.svg";
import { getData } from "@/persistence/getData";
import { updateTheme } from "@/persistence/updateTheme";
import { colorScheme } from "nativewind";
import { MenuItem } from "./MenuItem";
import { ThemedText } from "./ThemedText";

export function ThemeToggle() {
  const [selectedTheme, setSelectedTheme] = useState<
    "light" | "dark" | "system" | undefined
  >();

  useEffect(() => {
    const getSavedTheme = async () => {
      const data = await getData();
      if (data?.theme) {
        setSelectedTheme(data.theme);
      } else {
        setSelectedTheme(colorScheme.get());
      }
    };
    getSavedTheme();
  }, []);

  const onClick = useCallback(async (newTheme: "light" | "dark" | "system") => {
    colorScheme.set(newTheme);
    setSelectedTheme(newTheme);
    await updateTheme(newTheme);
  }, []);

  return (
    <>
      <ThemedText style={styles.headingText}>Theme</ThemedText>
      <MenuItem
        label="Light"
        icon={selectedTheme === "light" ? LightTheme : LightThemeOutline}
        onClick={() => onClick("light")}
      />
      <MenuItem
        label="Dark"
        icon={selectedTheme === "dark" ? DarkTheme : DarkThemeOutline}
        onClick={() => onClick("dark")}
      />
      <MenuItem
        label="System"
        icon={selectedTheme === "system" ? SystemTheme : SystemThemeOutline}
        onClick={() => onClick("system")}
      />
    </>
  );
}
const styles = StyleSheet.create({
  headingText: {
    padding: 8,
  },
});
