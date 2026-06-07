import { initialGamesState, STORAGE_KEY } from '$lib/types';
import { getData } from './getData';

export const clearGameProgress = (numberOfGames: number) => {
	try {
		const previousData = getData();

		const data = { ...previousData };
		data.games = data.games || {};
		data.games[numberOfGames] = initialGamesState;

		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error('Error clearing game progress', error);
	}
};
