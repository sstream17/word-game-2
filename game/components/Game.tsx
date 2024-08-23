import { View } from "react-native";
import { ThemedText } from "./ThemedText";

interface IProps {
    numberOfGames: number;
}

export function Game(props: IProps) {
    const {numberOfGames} = props;

    return <View>
        <ThemedText>Game {numberOfGames}</ThemedText>
    </View>
}