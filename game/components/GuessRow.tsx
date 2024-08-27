import { WORD_LENGTH } from "@/constants/game";
import { StyleSheet, Text, View } from "react-native";

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
          <Text selectable={false}>{guess[columnIndex] ?? ""}</Text>
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
    backgroundColor: "#fff",
    width: 20,
    height: 20,
  },
  c: {
    backgroundColor: "yellow",
  },
  x: {
    backgroundColor: "cyan",
  },
  _: {
    backgroundColor: "lightgray",
  },
});
