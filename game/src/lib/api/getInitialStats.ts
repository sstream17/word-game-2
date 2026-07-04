import type { IStats } from '$lib/types';

/**
 * Create a new object with empty initial stats
 * @returns A new object containing initial data for each keyed game on the stats page
 */
export const getInitialStats = (): IStats => ({
	gamesPlayed: 0,
	gamesWon: 0,
	sumOfFinishes: 0,
	currentWinStreak: 0,
	maxWinStreak: 0,
	finishCounts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
});
