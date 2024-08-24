import { View } from "react-native";
import { ThemedText } from "./ThemedText";

interface IProps {
  gameIndex: number;
}

export function GameBoard(props: IProps) {
  const { gameIndex } = props;

  return (
    <View>
      <ThemedText>Game {gameIndex}</ThemedText>
    </View>
  );
}
