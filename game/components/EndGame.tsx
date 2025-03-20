import { StyleSheet, Text, View } from "react-native";

interface IProps {
  answers: { [gameId: string]: string };
}

export function EndGame(props: IProps) {
  const { answers } = props;

  return (
    <View style={styles.wrapper}>
      {Object.keys(answers).map((gameId) => (
        <Text key={gameId} style={styles.answer}>
          {answers[gameId]}
        </Text>
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
