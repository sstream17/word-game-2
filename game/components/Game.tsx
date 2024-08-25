import {
  deleteLetterFromGuess,
  selectGuess,
  startGame,
  submitGuess,
  updateGuess,
  useGameDispatch,
  useGameSelector,
} from "@/store";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";

interface IProps {
  numberOfGames: number;
}

export function Game(props: IProps) {
  const { numberOfGames } = props;

  const guess = useGameSelector(selectGuess);
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
    dispatch(submitGuess(""));
  }, [dispatch]);

  return (
    <View style={styles.gameWrapper}>
      <Text>{guess}</Text>
      <View style={styles.gamesArea}>
        {[...Array(numberOfGames)].map((_, gameIndex) => (
          <GameBoard key={gameIndex} gameIndex={gameIndex} />
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
    backgroundColor: "#0022f8",
    alignItems: "center",
    justifyContent: "center",
  },
  gamesArea: {
    flex: 1,
    backgroundColor: "#00ff00",
    flexGrow: 1,
  },
});
