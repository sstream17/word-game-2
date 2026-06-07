import { type IGamesState, STORAGE_KEY } from '$lib/types';
import { getData } from './getData';

export const updateGameProgress = (newGameProgress: IGamesState, numberOfGames: number) => {
	try {
		const previousData = getData();

		const data = { ...previousData };
		data.games = data.games || {};
		data.games[numberOfGames] = newGameProgress;

		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error('Error storing updated game progress', error);
	}
};
