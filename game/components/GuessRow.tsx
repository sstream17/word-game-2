import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { WORD_LENGTH } from "@/constants/game";

interface IProps {
  guess: string;
  result: string;
}

export function GuessRow(props: IProps) {
  const { guess, result } = props;

  return (
    <View style={styles.gameRow}>
      {[...Array(WORD_LENGTH)].map((_, columnIndex) => (
        <View
          key={columnIndex}
          style={[styles.tile, styles[result[columnIndex] as "x" | "c" | "_"]]}
        >
          <Text style={styles.text} selectable={false}>
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
    gap: 8,
  },
  tile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.unknown,
    borderRadius: 4,
    width: 40,
    height: 50,
  },
  text: {
    fontSize: 24,
  },
  c: {
    backgroundColor: Colors.light.close,
    borderWidth: 2,
    borderColor: Colors.light.closeBorder,
  },
  x: {
    backgroundColor: Colors.light.exact,
  },
  _: {
    backgroundColor: Colors.light.missing,
  },
});
