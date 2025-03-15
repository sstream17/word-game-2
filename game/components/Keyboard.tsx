import { useCallback, useEffect } from "react";
import { Button, Platform, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { VALID_GAMES, VALID_KEYS } from "@/constants/game";
import { useKeySizes } from "@/hooks/useKeySizes";
import { IHints } from "@/types/game";
import { usePathname } from "expo-router";
import { KeyboardKey } from "./KeyboardKey";

interface IProps {
  overallStatus: "inProgress" | "won" | "lost";
  hints: { [gameId: string]: IHints };
  onKeyPress: (letter: string) => void;
}

export function Keyboard(props: IProps) {
  const { overallStatus, hints, onKeyPress } = props;

  const { keyWidth, keyHeight, keyGap } = useKeySizes();

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
    if (Platform.OS === "web") {
      document.addEventListener("keydown", handleKey, true);
    }

    return () => {
      if (Platform.OS === "web") {
        document.removeEventListener("keydown", handleKey, true);
      }
    };
  }, [handleKey]);

  const handleReset = useCallback(() => {
    onKeyPress("restart");
  }, [onKeyPress]);

  return (
    <View style={[styles.container, { gap: keyGap * 2 }]}>
      <View style={[styles.keyboardRow, { gap: keyGap }]}>
        {[..."qwertyuiop"].map((char) => (
          <KeyboardKey
            key={char}
            letter={char}
            width={keyWidth}
            height={keyHeight}
            hints={hints}
            onClick={onKeyPress}
          />
        ))}
      </View>
      <View style={[styles.keyboardRow, { gap: keyGap }]}>
        {[..."asdfghjkl"].map((char) => (
          <KeyboardKey
            key={char}
            letter={char}
            width={keyWidth}
            height={keyHeight}
            hints={hints}
            onClick={onKeyPress}
          />
        ))}
      </View>
      <View style={[styles.keyboardRow, { gap: keyGap }]}>
        <KeyboardKey
          letter={"backspace"}
          width={keyWidth * 1.5}
          height={keyHeight}
          icon="backspace-outline"
          onClick={onKeyPress}
        />
        {[..."zxcvbnm"].map((char) => (
          <KeyboardKey
            key={char}
            letter={char}
            width={keyWidth}
            height={keyHeight}
            hints={hints}
            onClick={onKeyPress}
          />
        ))}
        <KeyboardKey
          letter={"enter"}
          width={keyWidth * 1.5}
          height={keyHeight}
          icon="send-outline"
          onClick={onKeyPress}
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
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardRow: {
    display: "flex",
    flexDirection: "row",
  },
});
