import { Game } from "@/components/Game";
import { VALID_GAMES } from "@/constants/game";
import { Redirect, useLocalSearchParams } from "expo-router";

export async function generateStaticParams(): Promise<
  Record<string, string>[]
> {
  // Return an array of params to generate static HTML files for.
  // Each entry in the array is a page for a game.
  return VALID_GAMES.map((gameNumber) => ({
    num: `${gameNumber}`,
  }));
}

export default function GamePage() {
  const { num } = useLocalSearchParams<{
    num: string;
  }>();

  const numberOfGames = parseInt(num);

  if (!VALID_GAMES.includes(numberOfGames)) {
    return <Redirect href="/" />;
  }

  return <Game numberOfGames={numberOfGames} />;
}
