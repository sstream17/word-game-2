import { useCallback, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";

import { VALID_GAMES, VALID_KEYS } from "@/constants/game";
import { usePathname } from "expo-router";
import { KeyboardKey } from "./KeyboardKey";

interface IProps {
  onKeyPress: (letter: string) => void;
  overallStatus: "inProgress" | "won" | "lost";
}

export function Keyboard(props: IProps) {
  const { onKeyPress, overallStatus } = props;

  const pathname = usePathname();

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      const parsedPath = Number(pathname.split("/").pop());
      if (!VALID_GAMES.includes(parsedPath)) {
        // The keyboard listener can continue to live through forward navigation.
        // Don't handle key presses if the user has navigated away from the game.
        return;
      }

      if (event.metaKey) {
        return;
      }

      const key = event.key.toLowerCase();

      /* if (key === "enter" && won) {
          restart();
          return;
        }

        if (key === "enter" && !submittable) {
          badGuess();
          return;
        } */

      if (VALID_KEYS[key]) {
        onKeyPress(key);
      }
    },
    [pathname, onKeyPress],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", handleKey, true);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("keydown", handleKey, true);
      }
    };
  }, [handleKey]);

  const handleReset = useCallback(() => {
    onKeyPress("restart");
  }, [onKeyPress]);

  return (
    <View style={styles.container}>
      <View style={styles.keyboardRow}>
        {[..."qwertyuiop"].map((char) => (
          <KeyboardKey key={char} letter={char} onClick={onKeyPress} />
        ))}
      </View>
      <View style={styles.keyboardRow}>
        {[..."asdfghjkl"].map((char) => (
          <KeyboardKey key={char} letter={char} onClick={onKeyPress} />
        ))}
      </View>
      <View style={styles.keyboardRow}>
        <KeyboardKey
          letter={"backspace"}
          onClick={onKeyPress}
          icon="backspace-outline"
        />
        {[..."zxcvbnm"].map((char) => (
          <KeyboardKey key={char} letter={char} onClick={onKeyPress} />
        ))}
        <KeyboardKey
          letter={"enter"}
          onClick={onKeyPress}
          icon="send-outline"
        />
      </View>
      {overallStatus !== "inProgress" && (
        <View style={styles.keyboardRow}>
          <Button onPress={handleReset} title={"Reset"}></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0000ff",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  keyboardRow: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});
