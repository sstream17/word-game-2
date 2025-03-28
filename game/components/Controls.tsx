import { useCallback } from "react";
import { Button, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { useKeySizes } from "@/hooks/useKeySizes";
import { GameStatus, IHints } from "@/types/game";
import { EndGame } from "./EndGame";
import { Keyboard } from "./Keyboard";

interface IProps {
  overallStatus: GameStatus;
  hints: { [gameId: string]: IHints };
  answers: { [gameId: string]: string };
  winIndexes: { [gameId: string]: number | undefined };
  onKeyPress: (letter: string) => void;
}

export function Controls(props: IProps) {
  const { overallStatus, hints, answers, winIndexes, onKeyPress } = props;

  const { keyWidth, keyHeight, keyGap, keyboardHeight } = useKeySizes();

  const handleReset = useCallback(() => {
    onKeyPress("restart");
  }, [onKeyPress]);

  return (
    <View
      style={[
        styles.container,
        { height: keyboardHeight, paddingTop: keyGap, gap: keyGap * 2 },
      ]}
    >
      {overallStatus === "inProgress" ? (
        <Keyboard
          keyWidth={keyWidth}
          keyHeight={keyHeight}
          keyGap={keyGap}
          hints={hints}
          onKeyPress={onKeyPress}
        />
      ) : (
        <View style={styles.endGameWrapper}>
          <EndGame answers={answers} winIndexes={winIndexes} />
          <Button onPress={handleReset} title={"Reset"}></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  endGameWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: "100%",
  },
});
