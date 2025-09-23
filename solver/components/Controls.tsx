import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { useKeySizes } from "@/hooks/useKeySizes";
import { GameStatus, IHints } from "@/types/game";
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
      className="bg-[--color-background]"
      style={[
        styles.container,
        { height: keyboardHeight, paddingTop: keyGap, gap: keyGap * 2 },
      ]}
    >
      <Keyboard
        keyWidth={keyWidth}
        keyHeight={keyHeight}
        keyGap={keyGap}
        hints={hints}
        onKeyPress={onKeyPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  resetButton: {
    padding: 10,
    borderRadius: 4,
  },
  resetButtonText: {
    fontSize: 16,
  },
});
