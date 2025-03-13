import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";

import { useTileSizes } from "@/api";
import {
  deleteLetterFromGuess,
  selectCurrentGuess,
  selectGuessIndex,
  selectHints,
  selectOverallStatus,
  startGame,
  submitGuess,
  updateGuess,
  useGameDispatch,
  useGameSelector,
} from "@/store";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";

interface IProps {
  numberOfGames: number;
}

export function Game(props: IProps) {
  const { numberOfGames } = props;

  const { tileWidth, maxWidth } = useTileSizes(numberOfGames === 1 ? 1 : 2);

  const currentGuess = useGameSelector(selectCurrentGuess);
  const guessIndex = useGameSelector(selectGuessIndex);
  const overallStatus = useGameSelector(selectOverallStatus);
  const hints = useGameSelector(selectHints);

  const dispatch = useGameDispatch();

  useEffect(() => {
    dispatch(startGame(numberOfGames));
  }, [dispatch, numberOfGames]);

  const submit = useCallback(() => {
    // Check bad guess

    // Update storage

    // If not bad guess
    // - submit
    dispatch(submitGuess());
    // - animate
    // - handle win

    // else, tried bad guess
  }, [dispatch]);

  const restart = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  const handleUpdateGuess = useCallback(
    (newKey: string) => {
      switch (newKey) {
        case "enter":
          submit();
          break;
        case "restart":
          restart();
          break;
        case "backspace":
          dispatch(deleteLetterFromGuess());
          break;
        default:
          dispatch(updateGuess(newKey));
          break;
      }
    },
    [dispatch, restart, submit],
  );

  return (
    <GestureHandlerRootView style={styles.gameWrapper}>
      <ScrollView
        contentContainerStyle={[
          styles.gamesArea,
          {
            width: maxWidth,
            // Conditionally wrap to fix vertical centering issue
            flexWrap: numberOfGames === 4 ? "wrap" : "nowrap",
          },
        ]}
        style={styles.scrollArea}
      >
        {[...Array(numberOfGames)].map((_, gameIndex) => (
          <GameBoard
            key={gameIndex}
            gameIndex={gameIndex}
            numberOfGames={numberOfGames}
            currentGuess={currentGuess}
            guessIndex={guessIndex}
            tileWidth={tileWidth}
          />
        ))}
      </ScrollView>
      <Keyboard
        overallStatus={overallStatus}
        hints={hints}
        onKeyPress={handleUpdateGuess}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gameWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scrollArea: {
    height: "100%",
  },
  gamesArea: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
