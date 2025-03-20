import { StyleSheet, View } from "react-native";

import { ThemedText } from "./ThemedText";

interface IProps {
  answers: { [gameId: string]: string };
}

export function EndGame(props: IProps) {
  const { answers } = props;

  return (
    <View style={styles.wrapper}>
      {Object.keys(answers).map((gameId) => (
        <ThemedText key={gameId} style={styles.answer}>
          {answers[gameId]}
        </ThemedText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  answer: {
    flexBasis: "40%",
  },
});
