import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { colorScheme } from "nativewind";
import { MenuItem } from "./MenuItem";
import { ThemedText } from "./ThemedText";

export function ThemeToggle() {
  const onClick = useCallback((itemLabel: "light" | "dark" | "system") => {
    colorScheme.set(itemLabel);
  }, []);

  return (
    <>
      <ThemedText style={styles.headingText}>Theme</ThemedText>
      <MenuItem label="Light" icon="sunny" onClick={() => onClick("light")} />
      <MenuItem label="Dark" icon="dark-mode" onClick={() => onClick("dark")} />
      <MenuItem
        label="System"
        icon="brightness-auto"
        onClick={() => onClick("system")}
      />
    </>
  );
}
const styles = StyleSheet.create({
  headingText: {
    paddingStart: 8,
  },
});
