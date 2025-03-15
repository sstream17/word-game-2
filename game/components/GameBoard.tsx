import { StyleSheet, View } from "react-native";

import { NUMBER_OF_TRIES } from "@/constants/game";
import { TILE_GAP } from "@/constants/layout";
import { selectGameGuesses, selectGameStatus, useGameSelector } from "@/store";
import { GuessRow } from "./GuessRow";

interface IProps {
  gameIndex: number;
  numberOfGames: number;
  currentGuess: string;
  guessIndex: number;
  tileWidth: number;
}

export function GameBoard(props: IProps) {
  const { gameIndex, numberOfGames, currentGuess, guessIndex, tileWidth } =
    props;

  const guesses = useGameSelector((state) =>
    selectGameGuesses(state, gameIndex),
  );

  const status = useGameSelector((state) => selectGameStatus(state, gameIndex));
  const isGameWon = status === "won";

  return (
    <View style={styles.gameBoard}>
      {[...Array(numberOfGames + NUMBER_OF_TRIES)].map((_, rowIndex) => {
        const isCurrentGuess = rowIndex === guessIndex;
        const guessToDisplay =
          isCurrentGuess && !isGameWon
            ? currentGuess
            : (guesses[rowIndex]?.guess ?? "");
        const resultToDisplay = guesses[rowIndex]?.result ?? "";

        return (
          <GuessRow
            key={rowIndex}
            guess={guessToDisplay}
            result={resultToDisplay}
            width={tileWidth}
            isCurrentRow={isCurrentGuess}
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
    gap: TILE_GAP,
    marginBottom: 2, // Just enough to render the shadow
    alignItems: "center",
  },
});
