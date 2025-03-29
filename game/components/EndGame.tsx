import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

interface IProps {
  answers: { [gameId: string]: string };
  winIndexes: { [gameId: string]: number | undefined };
}

export function EndGame(props: IProps) {
  const { answers, winIndexes } = props;

  return (
    <View style={styles.wrapper}>
      {Object.keys(answers).map((gameId, index) => {
        const isWon = (winIndexes[gameId] ?? -1) !== -1;
        return (
          <View
            key={gameId}
            style={[
              styles.answer,
              { flexDirection: index % 2 === 0 ? "row" : "row-reverse" },
            ]}
          >
            <ThemedText key={gameId} className="!text-2xl">
              {answers[gameId]}
            </ThemedText>
            <View
              style={[
                styles.numberOfTries,
                {
                  backgroundColor: isWon
                    ? Colors.light.exact
                    : Colors.light.invalid,
                },
              ]}
            >
              <ThemedText className="!text-xl">
                {isWon ? winIndexes[gameId]! + 1 : ""}
              </ThemedText>
            </View>
          </View>
        );
      })}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  numberOfTries: {
    backgroundColor: Colors.light.exact,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    padding: 4,
    borderRadius: 4,
  },
});
