import { Platform, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { WORD_LENGTH } from "@/constants/game";
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  TILE_FONT_SIZE,
  TILE_FONT_SIZE_SMALL,
  TILE_GAP,
} from "@/constants/layout";

interface IProps {
  guess: string;
  result: string;
  width: number;
  isCurrentRow: boolean;
}

export function GuessRow(props: IProps) {
  const { guess, result, width, isCurrentRow = false } = props;

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
          <Text
            style={
              isCurrentRow
                ? { fontSize: TILE_FONT_SIZE }
                : { fontSize: TILE_FONT_SIZE_SMALL }
            }
            selectable={false}
          >
            {guess[columnIndex] ?? ""}
          </Text>
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
});
