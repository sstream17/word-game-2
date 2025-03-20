import { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { WORD_LENGTH } from "@/constants/game";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  TILE_FONT_SIZE,
  TILE_FONT_SIZE_SMALL,
  TILE_GAP,
} from "@/constants/layout";
import Svg, { Path } from "react-native-svg";
import { ThemedText } from "./ThemedText";

interface IProps {
  guess: string;
  result: string;
  width: number;
  isCurrentRow: boolean;
  isInvalid: boolean;
}

export function GuessRow(props: IProps) {
  const {
    guess,
    result,
    width,
    isCurrentRow = false,
    isInvalid = false,
  } = props;

  const textStyle = useMemo(
    () => ({
      fontSize: isCurrentRow ? TILE_FONT_SIZE : TILE_FONT_SIZE_SMALL,
      ...(isInvalid
        ? {
            color: "red",
          }
        : null),
    }),
    [isCurrentRow, isInvalid],
  );

  return (
    <View style={styles.gameRow}>
      {[...Array(WORD_LENGTH)].map((_, columnIndex) => (
        <View
          key={columnIndex}
          style={[
            styles.tile,
            styles[result[columnIndex] as "x" | "c" | "_"],
            { width, height: isCurrentRow ? width * 1.2 : width },
          ]}
        >
          <ThemedText style={textStyle} selectable={false}>
            {guess[columnIndex] ?? ""}
          </ThemedText>
          {isCurrentRow ? (
            <Svg
              height="8"
              width="70%"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              style={{ marginTop: -2 }}
            >
              <Path
                d="M4 5 L 14 0 L 24 5 L 34 0 L 44 5 L 54 0 L 64 5 L 74 0 L 84 5 L 94 0"
                stroke={isInvalid ? "red" : "transparent"}
                strokeWidth="2"
                fill="transparent"
              />
            </Svg>
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gameRow: {
    display: "flex",
    flexDirection: "row",
    gap: TILE_GAP,
  },
  tile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.unknown,
    borderRadius: BORDER_RADIUS,
    ...Platform.select({
      ios: {
        shadowColor: "#00000088",
        shadowRadius: 1,
      },
      web: {
        boxShadow: "0 0 2px #00000088",
      },
      android: {
        elevation: 1,
      },
    }),
  },
  c: {
    backgroundColor: Colors.light.close,
    borderWidth: BORDER_WIDTH,
    borderColor: Colors.light.closeBorder,
  },
  x: {
    backgroundColor: Colors.light.exact,
  },
  _: {
    backgroundColor: Colors.light.missing,
  },
  text: {
    color: Colors.light.text,
  },
});
