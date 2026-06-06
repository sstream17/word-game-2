import { STORAGE_KEY, type Theme } from '$lib/types';
import { getData } from './getData';

export const updateTheme = (newTheme: Theme) => {
	try {
		const previousData = getData();

		const data = { ...previousData };
		data.theme = newTheme;

		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error('Error storing updated theme', error);
	}
};
