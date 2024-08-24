import { Game } from "@/components/Game";
import { Redirect, useLocalSearchParams } from "expo-router";

const validGames = [1, 2, 4];

export default function GamePage() {
  const {num} = useLocalSearchParams<{num: string}>();

  const numberOfGames = parseInt(num);

  if (!validGames.includes(numberOfGames)) {
    return <Redirect href="/" />;
  }
  
  return (
    <Game numberOfGames={numberOfGames} />
  );
}