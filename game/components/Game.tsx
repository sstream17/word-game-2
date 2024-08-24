import { StyleSheet, View } from "react-native";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";

interface IProps {
  numberOfGames: number;
}

export function Game(props: IProps) {
  const { numberOfGames } = props;

  return (
    <View style={styles.gameWrapper}>
      <View style={styles.gamesArea}>
        {[...Array(numberOfGames)].map((_, gameIndex) => (
          <GameBoard key={gameIndex} gameIndex={gameIndex} />
        ))}
      </View>
      <Keyboard />
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
