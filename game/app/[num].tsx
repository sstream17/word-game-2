import { Game } from "@/components/Game";
import { Redirect, useLocalSearchParams } from "expo-router";

const validGames = [1, 2, 4];

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  // Return an array of params to generate static HTML files for.
  // Each entry in the array is a page for a game.
  return validGames.map(gameNumber => ({ num: `${gameNumber}` }));
}

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