import { useCallback } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { KEY_FONT_SIZE } from "@/constants/layout";
import { IHints, KeyStatus } from "@/types/game";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { KeyBackground } from "./KeyBackground";
import { ThemedText } from "./ThemedText";

interface IProps {
  letter: string;
  width: number;
  height: number;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  hints?: { [gameId: string]: IHints };
  onClick: (letter: string) => void;
}

function getLetterColors(
  letter: string,
  hints?: { [gameId: string]: IHints },
): KeyStatus[] {
  if (!hints) {
    return ["unknown", "unknown", "unknown", "unknown"];
  }

  const colors = Object.keys(hints).map((gameId) => hints[gameId][letter]);

  switch (colors.length) {
    case 1:
      return [colors[0], colors[0], colors[0], colors[0]];
    case 2:
      return [colors[0], colors[1], colors[0], colors[1]];
    case 4:
      return colors;
    default:
      return ["unknown", "unknown", "unknown", "unknown"];
  }
}

export function KeyboardKey(props: IProps) {
  const { letter, width, height, icon, hints, onClick: updateGuess } = props;

  const onPress = useCallback(() => {
    updateGuess(letter);
    if (Platform.OS === "android") {
      impactAsync(ImpactFeedbackStyle.Medium);
    }
  }, [letter, updateGuess]);

  const theme = Colors["light"];
  const colors = getLetterColors(letter, hints);

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.keyContainer, { width, height }]}>
        <KeyBackground
          width={width}
          height={height}
          colors={colors}
          theme={theme}
        />
        {icon ? (
          <MaterialCommunityIcons style={styles.letter} name={icon} />
        ) : (
          <ThemedText style={styles.letter} selectable={false}>
            {letter}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    position: "absolute",
    textAlign: "center",
    fontSize: KEY_FONT_SIZE,
    color: "#000",
  },
});
