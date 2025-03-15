import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";

import { BOARD_GAP, TILE_GAP } from "@/constants/layout";
import { useTileSizes } from "@/hooks/useTileSizes";
import {
  deleteLetterFromGuess,
  selectCurrentGuess,
  selectGuessIndex,
  selectIsGuessInvalid,
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
  const isGuessInvalid = useGameSelector(selectIsGuessInvalid);
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
            isGuessInvalid={isGuessInvalid}
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
    gap: TILE_GAP * 3,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: BOARD_GAP,
  },
});
