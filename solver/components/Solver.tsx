import { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";

import { BOARD_GAP, TILE_GAP } from "@/constants/layout";
import { useTileSizes } from "@/hooks/useTileSizes";
import {
    deleteLetterFromGuess,
    selectAnswers,
    selectCurrentGuess,
    selectHints,
    selectIsGuessInvalid,
    selectNumberOfGames,
    selectOverallStatus,
    selectWinIndexes,
    submitGuess,
    updateGuess,
    useGameDispatch,
    useGameSelector
} from "@/store";
import { useHeaderHeight } from "@react-navigation/elements";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";
import { Controls } from "./Controls";
import { ThemedText } from "./ThemedText";

export function Solver() {

  const { tileWidth, maxWidth } = useTileSizes(1);

  const headerHeight = useHeaderHeight();

  const currentGuess = useGameSelector(selectCurrentGuess);
  const isGuessInvalid = useGameSelector(selectIsGuessInvalid);
  const overallStatus = useGameSelector(selectOverallStatus);
  const storedNumberOfGames = useGameSelector(selectNumberOfGames);
  const answers = useGameSelector(selectAnswers);
  const winIndexes = useGameSelector(selectWinIndexes);
  const hints = useGameSelector(selectHints);

  const dispatch = useGameDispatch();

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
    // clearGameProgress(numberOfGames);
    // dispatch(startGame());
  }, [dispatch,]);

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
    <GestureHandlerRootView
      style={[styles.gameWrapper, { marginTop: headerHeight }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.gamesArea,
          {
            width: maxWidth,
          },
        ]}
        style={styles.scrollArea}
      >
        <ThemedText className="!font-nunitoBold !text-2xl">Correct Letters</ThemedText>
        <Pressable style={styles.gameMode} className="bg-[--color-exact]">
          <ThemedText style={styles.gameModeText}>Add correct letter</ThemedText>
        </Pressable>
        <ThemedText className="!font-nunitoBold !text-2xl">Close Letters</ThemedText>
        <Pressable style={styles.gameMode} className="bg-[--color-exact]">
          <ThemedText style={styles.gameModeText}>Add close letter</ThemedText>
        </Pressable>
        <ThemedText className="!font-nunitoBold !text-2xl">Banned Letters</ThemedText>
        <Pressable style={styles.gameMode} className="bg-[--color-exact]">
          <ThemedText style={styles.gameModeText}>Add banned letter</ThemedText>
        </Pressable>
      </ScrollView>
      <Controls
        overallStatus={overallStatus}
        hints={hints}
        answers={answers}
        winIndexes={winIndexes}
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
    width: "100%",
  },
  gamesArea: {
    alignSelf: "center",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    gap: TILE_GAP * 3,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: BOARD_GAP,
  },
  gameMode: {
    padding: 10,
    borderRadius: 8,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  gameModeText: {
    fontSize: 20,
  },
});
