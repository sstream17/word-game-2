import {
  deleteLetterFromGuess,
  selectCurrentGuess,
  selectGuessIndex,
  startGame,
  submitGuess,
  updateGuess,
  useGameDispatch,
  useGameSelector,
} from "@/store";
import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";

interface IProps {
  numberOfGames: number;
}

export function Game(props: IProps) {
  const { numberOfGames } = props;

  const currentGuess = useGameSelector(selectCurrentGuess);
  const guessIndex = useGameSelector(selectGuessIndex);
  const dispatch = useGameDispatch();

  useEffect(() => {
    dispatch(startGame(numberOfGames));
  }, [dispatch, numberOfGames]);

  const handleUpdateGuess = useCallback(
    (newKey: string) => {
      if (newKey === "backspace") {
        dispatch(deleteLetterFromGuess());
        return;
      }

      dispatch(updateGuess(newKey));
    },
    [dispatch],
  );

  const handleSubmitGuess = useCallback(() => {
    dispatch(submitGuess());
  }, [dispatch]);

  return (
    <View style={styles.gameWrapper}>
      <View style={styles.gamesArea}>
        {[...Array(numberOfGames)].map((_, gameIndex) => (
          <GameBoard
            key={gameIndex}
            gameIndex={gameIndex}
            numberOfGames={numberOfGames}
            currentGuess={currentGuess}
            guessIndex={guessIndex}
          />
        ))}
      </View>
      <Keyboard
        updateGuess={handleUpdateGuess}
        submitGuess={handleSubmitGuess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gameWrapper: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  gamesArea: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#00ff00",
    width: "50%",
  },
});
