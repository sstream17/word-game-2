import { type IStats, STORAGE_KEY } from '$lib/types';
import { getData } from './getData';

export const updateGameStats = (newGameStats: IStats, numberOfGames: number) => {
	try {
		const previousData = getData();

		const data = { ...previousData };
		data.stats = data.stats ?? { value: {} };
		data.stats.value[numberOfGames] = newGameStats;

		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error('Error storing updated game progress', error);
	}
};
