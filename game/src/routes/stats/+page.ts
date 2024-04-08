import { browser } from '$app/environment';
import type { GameStats } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (() => {
    const storageKeyBase = 'stats';

    const indexedStats: { [index: number]: GameStats } = {};

    for (let key of [1, 2, 4]) {
        const initialState = browser ? localStorage.getItem(`${storageKeyBase}-${key}`) ?? '' : '';
        const stats = initialState ? JSON.parse(initialState) : { wins: 0, played: 0, streak: 0, maxStreak: 0 };
        indexedStats[key] = stats;
    }

    return indexedStats;
}) satisfies PageLoad;