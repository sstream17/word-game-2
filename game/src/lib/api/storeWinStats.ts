import { browser } from "$app/environment";
import type { GameStats } from "$lib/types";

/**
 * Increment the count of games won at the current index and update the store
 * @param storageKey They key to retrieve this item in the store
 * @param numberOfGames The number of games
 * @param winIndex The index of the last correctly guessed word
 */
export function storeWinStats(storageKey: string, numberOfGames: number, winIndex: number): void {
    if (!browser) {
        return;
    }

    const storedStatsUnparsed = localStorage.getItem(storageKey);
    const storedStats: GameStats = storedStatsUnparsed ? JSON.parse(storedStatsUnparsed) : {};

    const guessIndex = winIndex > -1 ? winIndex - numberOfGames + 1 : -1;
    const previousTotalNumberOfWins = storedStats['wins'] ?? 0;
    const previousNumberOfWinsAtGuess = storedStats[guessIndex] ?? 0;
    const previousMaxWins = storedStats['maxWins'] ?? 0;
    const previousTotalNumberPlayed = storedStats['played'] ?? 0;
    const previousStreak = storedStats['streak'] ?? 0;
    const previousMaxStreak = storedStats['maxStreak'] ?? 0;

    const won = guessIndex !== -1

    const newNumberOfWins = previousNumberOfWinsAtGuess + 1;
    const newNumberOfTotalWins = won ? previousTotalNumberOfWins + 1 : previousTotalNumberOfWins;
    const newMaxWins = newNumberOfWins > previousMaxWins ? newNumberOfWins : previousMaxWins;
    const newStreak = won ? previousStreak + 1 : 0;
    const newMaxStreak = newStreak > previousMaxStreak ? newStreak : previousMaxStreak;

    const newStats: GameStats = {
        ...storedStats,
        [guessIndex]: newNumberOfWins,
        'wins': newNumberOfTotalWins,
        'maxWins': newMaxWins,
        'played': previousTotalNumberPlayed + 1,
        'streak': newStreak,
        'maxStreak': newMaxStreak,
    };

    localStorage.setItem(storageKey, JSON.stringify(newStats));
}