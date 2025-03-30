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
import { cssInterop } from "nativewind";

cssInterop(Path, {
  className: {
    target: "style",
    nativeStyleToProp: { stroke: true },
  },
});

const backgroundColorMap = {
  x: "bg-[--color-exact]",
  c: "bg-[--color-close]",
  _: "bg-[--color-missing]",
};

const borderColorMap = {
  x: "border-[--color-exactBorder]",
  c: "border-[--color-closeBorder] border-2",
  _: "border-[--color-missingBorder]",
};

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

  const textClassName = useMemo(
    () => (isInvalid ? "!text-[--color-invalid]" : ""),
    [isInvalid],
  );

  const textStyle = useMemo(
    () => ({
      fontSize: isCurrentRow ? TILE_FONT_SIZE : TILE_FONT_SIZE_SMALL,
    }),
    [isCurrentRow],
  );

  return (
    <View style={styles.gameRow}>
      {[...Array(WORD_LENGTH)].map((_, columnIndex) => {
        const resultValue = result[columnIndex] as "x" | "c" | "_";
        const backgroundClassName =
          backgroundColorMap[resultValue] ?? "bg-[--color-unknown]";
        const borderClassName =
          borderColorMap[resultValue] ?? "bg-[--color-unknownBorder]";

        return (
          <View
            key={columnIndex}
            className={`${backgroundClassName} ${borderClassName}`}
            style={[
              styles.tile,
              { width, height: isCurrentRow ? width * 1.2 : width },
            ]}
          >
            <ThemedText
              className={textClassName}
              style={textStyle}
              selectable={false}
            >
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
                  className={
                    isInvalid
                      ? "stroke-[--color-invalid]"
                      : "stroke-transparent"
                  }
                  strokeWidth="2"
                  fill="transparent"
                />
              </Svg>
            ) : null}
          </View>
        );
      })}
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
});
