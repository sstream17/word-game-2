import { FC, useCallback } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

import { KEY_FONT_SIZE } from "@/constants/layout";
import { IHints, KeyStatus } from "@/types/game";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { SvgProps } from "react-native-svg";
import { KeyBackground } from "./KeyBackground";
import { ThemedText } from "./ThemedText";

interface IProps {
  letter: string;
  width: number;
  height: number;
  icon?: FC<SvgProps>;
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
  const {
    letter,
    width,
    height,
    icon: Icon,
    hints,
    onClick: updateGuess,
  } = props;

  const onPress = useCallback(() => {
    updateGuess(letter);
    if (Platform.OS === "android") {
      impactAsync(ImpactFeedbackStyle.Medium);
    }
  }, [letter, updateGuess]);

  const colors = getLetterColors(letter, hints);

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.keyContainer, { width, height }]}>
        <KeyBackground width={width} height={height} colors={colors} />
        {Icon ? (
          <Icon className="fill-[--color-text]" style={styles.letter} />
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
  },
});
