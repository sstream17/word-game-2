import { browser } from "$app/environment";

type GameStats = {
    [winIndex: number]: number;
}

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
    const storedStats = storedStatsUnparsed ? JSON.parse(storedStatsUnparsed) as GameStats : {};

    const statsIndex = winIndex > -1 ? winIndex - numberOfGames + 1 : -1;
    const previousNumberOfWins = storedStats[statsIndex] ?? 0;

    const newStats = { ...storedStats, [statsIndex]: previousNumberOfWins + 1 };

    localStorage.setItem(storageKey, JSON.stringify(newStats));
}