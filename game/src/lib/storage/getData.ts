import { STORAGE_KEY, type IStoredGameState } from '$lib/types';

export const getData = (): IStoredGameState | undefined => {
	try {
		const jsonData = localStorage.getItem(STORAGE_KEY);
		return jsonData ? JSON.parse(jsonData) : undefined;
	} catch (error) {
		console.error('Error getting data from storage', error);
		return undefined;
	}
};
