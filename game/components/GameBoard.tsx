import { NUMBER_OF_TRIES } from "@/constants/game";
import { StyleSheet, View } from "react-native";
import { GuessRow } from "./GuessRow";

interface IProps {
  gameIndex: number;
  numberOfGames: number;
  currentGuess: string;
}

export function GameBoard(props: IProps) {
  const { gameIndex, numberOfGames, currentGuess } = props;

  return (
    <View style={styles.gameBoard}>
      {[...Array(numberOfGames + NUMBER_OF_TRIES)].map((_, rowIndex) => (
        <GuessRow key={rowIndex} currentGuess={currentGuess} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gameBoard: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});
