import { NUMBER_OF_TRIES } from "@/constants/game";
import { selectGameGuesses, useGameSelector } from "@/store";
import { StyleSheet, View } from "react-native";
import { GuessRow } from "./GuessRow";

interface IProps {
  gameIndex: number;
  numberOfGames: number;
  currentGuess: string;
  guessIndex: number;
}

export function GameBoard(props: IProps) {
  const { gameIndex, numberOfGames, currentGuess, guessIndex } = props;

  const guesses = useGameSelector((state) =>
    selectGameGuesses(state, gameIndex),
  );

  return (
    <View style={styles.gameBoard}>
      {[...Array(numberOfGames + NUMBER_OF_TRIES)].map((_, rowIndex) => {
        const isCurrentGuess = rowIndex === guessIndex;
        const guessToDisplay = isCurrentGuess
          ? currentGuess
          : (guesses[rowIndex]?.guess ?? "");
        const resultToDisplay = guesses[rowIndex]?.result ?? "";
        return (
          <GuessRow
            key={rowIndex}
            guess={guessToDisplay}
            result={resultToDisplay}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  gameBoard: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flexBasis: "50%",
    marginBottom: 16,
    alignItems: "center",
  },
});
