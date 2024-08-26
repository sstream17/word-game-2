import { WORD_LENGTH } from "@/constants/game";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
  currentGuess: string;
}

export function GuessRow(props: IProps) {
  const { currentGuess } = props;

  return (
    <View style={styles.gameRow}>
      {[...Array(WORD_LENGTH)].map((_, columnIndex) => (
        <View key={columnIndex} style={styles.tile}>
          <Text selectable={false}>{currentGuess[columnIndex]}</Text>
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
  },
});
