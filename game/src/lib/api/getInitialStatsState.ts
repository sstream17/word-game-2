import type { IStatsState } from '$lib/types';
import { getInitialStats } from './getInitialStats';

/**
 * Create a new object with empty initial stats state for all keyed games
 * @returns A new object containing initial state for the stats page
 */
export const getInitialStatsState = (): IStatsState => ({
	value: {
		1: getInitialStats(),
		2: getInitialStats(),
		4: getInitialStats()
	}
});
