import { browser } from '$app/environment';
import { getInitialStatsState, mergeStats } from '$lib/api';
import { getData } from '$lib/storage';
import type { PageLoad } from './$types';

export const load = (() => {
	const storedValue = browser ? getData()?.stats?.value : undefined;
	const initialValue = getInitialStatsState().value;

	const stats = Object.fromEntries(
		Object.entries(initialValue).map(([key, value]) => [
			key,
			mergeStats(value, storedValue?.[key as unknown as number])
		])
	);

	return stats;
}) satisfies PageLoad;
