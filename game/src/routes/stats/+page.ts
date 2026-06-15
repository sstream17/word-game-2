import { browser } from '$app/environment';
import { getData } from '$lib/storage';
import { initialStatsState } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (() => {
    const storedState = browser ? getData()?.stats : undefined;

    const stats = {
        ...initialStatsState.value,
        ...storedState?.value,
    }

    return stats;
}) satisfies PageLoad;