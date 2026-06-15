import { browser } from '$app/environment';
import { getData, updateGameStats } from '$lib/storage';
import { initialStats, type IStatsState } from '$lib/types';
import { getFinishIndex } from './getFinishIndex';

interface IPayload {
	numberOfGames: number;
	won: boolean;
	winIndexes: { [gameId: string]: number | undefined };
}

/**
 * Increment the count of games won at the current index and update the store
 * @param payload The payload to update the stats with
 */
export function storeWinStats(payload: IPayload): void {
	if (!browser) {
		return;
	}

	const { numberOfGames, won, winIndexes } = payload;

	const storedStats = getData()?.stats ?? { value: {} } as IStatsState;

	const existingStats = storedStats.value[numberOfGames];


	const newStats = {
		...initialStats,
		...existingStats,
	}

	const previousMaxFinishCount = newStats.maxFinishCount;

	newStats.gamesPlayed = newStats.gamesPlayed + 1;

	if (won) {
		const newNumberOfWins = newStats.gamesWon + 1;
		newStats.gamesWon = newNumberOfWins;
		newStats.currentWinStreak = newStats.currentWinStreak + 1;
		newStats.maxWinStreak = Math.max(newStats.maxWinStreak, newStats.currentWinStreak);
		newStats.maxFinishCount = newNumberOfWins > previousMaxFinishCount ? newNumberOfWins : previousMaxFinishCount;
	} else {
		newStats.currentWinStreak = 0;
	}

	const finishIndex = getFinishIndex(numberOfGames, winIndexes, won);

	newStats.sumOfFinishes = newStats.sumOfFinishes + numberOfGames + finishIndex;

	newStats.finishCounts[finishIndex] = (newStats.finishCounts?.[finishIndex] ?? 0) + 1;

	updateGameStats(newStats, numberOfGames);
}
