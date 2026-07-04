import { getInitialStats } from '../getInitialStats';
import { mergeStats } from '../mergeStats';

describe('mergeStats', () => {
	it('returns initial stats when existing stats are undefined', () => {
		const initial = getInitialStats();

		const result = mergeStats(initial, undefined);

		expect(result).toEqual({
			gamesPlayed: 0,
			gamesWon: 0,
			sumOfFinishes: 0,
			currentWinStreak: 0,
			maxWinStreak: 0,
			finishCounts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
		});
	});

	it('replaces initial stats with existing stats', () => {
		const initial = getInitialStats();
		const existing = {
			gamesPlayed: 4,
			gamesWon: 3,
			sumOfFinishes: 17,
			currentWinStreak: 0,
			maxWinStreak: 2,
			finishCounts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 2, 5: 1, 6: 1 }
		};
		
		const result = mergeStats(initial, existing);

		expect(result).toEqual({
			gamesPlayed: 4,
			gamesWon: 3,
			sumOfFinishes: 17,
			currentWinStreak: 0,
			maxWinStreak: 2,
			finishCounts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 2, 5: 1, 6: 1 }
		});
	});
});
