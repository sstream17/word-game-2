import { NUMBER_OF_TRIES } from "@/constants/game";

/**
 * Given all the indices of the games won, normalize the finish index into a value from 0 to 6.
 * 0 means the user won in the least number of tries, 5 means the user won in the maximum number of tries,
 * and 6 means the user lost.
 * @param numberOfGames The number of games played
 * @param winIndexes An object containing the indices of the games won, indexed by the number of the game
 * @param won If the user won the game
 * @returns The normalized finish index
 */
export function getFinishIndex(
  numberOfGames: number,
  winIndexes: {
    [gameIndex: string]: number | undefined;
  },
  won: boolean,
) {
  if (!won) {
    return NUMBER_OF_TRIES + 1;
  }

  const maxFinishIndex = Object.values(winIndexes).reduce<number>(
    (acc, winIndex) => {
      if (winIndex === undefined) {
        return -1;
      }

      return Math.max(acc ?? -1, winIndex);
    },
    -1,
  );

  return maxFinishIndex - numberOfGames + 1;
}
