jest.mock('$lib/storage');
import { getData, updateGameStats } from '$lib/storage';
const mockedGetData = getData as jest.Mock;
const mockedUpdateGameStats = updateGameStats as jest.Mock;

import { storeWinStats } from '../storeWinStats';

describe('storeWinStats', () => {
	describe('when no existing stats are found', () => {
		describe('when won', () => {
			beforeEach(() => {
				mockedGetData.mockReturnValueOnce(undefined);
			});

			it('increments the games played count', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: true, winIndexes: { 1: 3 } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						gamesPlayed: 1
					}),
					numberOfGames
				);
			});

			it('increments the games won count', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: true, winIndexes: { 1: 3 } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						gamesWon: 1
					}),
					numberOfGames
				);
			});

			it('increments the current streak count', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: true, winIndexes: { 1: 3 } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						currentWinStreak: 1
					}),
					numberOfGames
				);
			});

			it('increments the max streak count', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: true, winIndexes: { 1: 3 } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						maxWinStreak: 1
					}),
					numberOfGames
				);
			});

			it('updates the sum of finishes', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: true, winIndexes: { 1: 3 } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						sumOfFinishes: 4
					}),
					numberOfGames
				);
			});

			it('updates the finish counts', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: true, winIndexes: { 1: 3 } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						finishCounts: { 0: 0, 1: 0, 2: 0, 3: 1, 4: 0, 5: 0, 6: 0 }
					}),
					numberOfGames
				);
			});
		});

		describe('when lost', () => {
			beforeEach(() => {
				mockedGetData.mockReturnValueOnce(undefined);
			});

			it('increments the games played count', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: false, winIndexes: { 1: undefined } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						gamesPlayed: 1
					}),
					numberOfGames
				);
			});

			it('clears the current streak count', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: false, winIndexes: { 1: undefined } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						currentWinStreak: 0
					}),
					numberOfGames
				);
			});

			it('updates the sum of finishes', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: false, winIndexes: { 1: undefined } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						sumOfFinishes: 7
					}),
					numberOfGames
				);
			});

			it('updates the finish counts', () => {
				const numberOfGames = 1;

				storeWinStats({ numberOfGames, won: false, winIndexes: { 1: undefined } });

				expect(mockedUpdateGameStats).toHaveBeenCalledWith(
					expect.objectContaining({
						finishCounts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1 }
					}),
					numberOfGames
				);
			});
		});
	});
});
