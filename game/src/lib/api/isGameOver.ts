import { NUMBER_TRIES, type HintString } from "$lib/types";

/**
 * 
 * @param hints Indexed object of hints for each game
 * @param numberOfGames The number of games 
 * @returns True if all hints have been revealed for a game, false otherwise
 */
export function isGameOver(hints: { [index: string]: HintString[] }, numberOfGames: number): boolean {
    return hints[0].findLastIndex((guess) => !!guess) >= numberOfGames + NUMBER_TRIES - 1
}