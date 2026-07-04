import type { IStats } from '$lib/types';

export const mergeStats = (initial: IStats, existing?: Partial<IStats>): IStats => ({
	...initial,
	...existing,
	finishCounts: {
		...initial.finishCounts,
		...existing?.finishCounts
	}
});
