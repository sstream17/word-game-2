import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";

interface IProps {
  numberOfGames: number;
}

export function Game(props: IProps) {
  const { numberOfGames } = props;

  const [guess, setGuess] = useState("");

  const updateGuess = useCallback(
    (newKey: string) => {
      if (newKey === "backspace") {
        setGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (guess.length === 5) {
        return;
      }

      setGuess((prev) => `${prev}${newKey}`);
    },
    [guess.length],
  );

  const submitGuess = useCallback(() => {}, []);

  return (
    <View style={styles.gameWrapper}>
      <Text>{guess}</Text>
      <View style={styles.gamesArea}>
        {[...Array(numberOfGames)].map((_, gameIndex) => (
          <GameBoard key={gameIndex} gameIndex={gameIndex} />
        ))}
      </View>
      <Keyboard updateGuess={updateGuess} submitGuess={submitGuess} />
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
