import { browser } from '$app/environment';
import { getData } from '$lib/storage';
import { initialGamesState } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const numberOfGames = Math.max(1, Math.min(+(params.num ?? 1), 4));

	const storedState = browser ? getData()?.games : undefined;

	const game = storedState?.[numberOfGames];
	return { ...initialGamesState, ...game, numberOfGames };
}) satisfies PageLoad;
