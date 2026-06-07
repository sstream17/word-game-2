import { browser } from '$app/environment';
import { getData } from '$lib/storage';
import { Game } from '../game';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const numberOfGames = Math.max(1, Math.min(+(params.num ?? 1), 4));

	const initialState = browser ? getData()?.games : undefined;

	const game = new Game(initialState, numberOfGames);
	return {...game};
}) satisfies PageLoad;
