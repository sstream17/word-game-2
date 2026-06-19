<script lang="ts">
	import { type IChartData } from '$lib/types';
	import BarChart from './BarChart.svelte';

	interface IProps {
		numberOfGames: number;
		finishCounts: Record<number, number>;
		maxWidth: number;
	}

	const { numberOfGames, finishCounts, maxWidth }: IProps = $props();

	const data = $derived.by(() =>
		Object.keys(finishCounts).reduce(
			(acc, key) => {
				if (key === '6') {
					acc.labels.push('L');
				} else {
					acc.labels.push(`${+key + numberOfGames}`);
				}
				acc.data.push(finishCounts[`${+key}`]);
				return acc;
			},
			{ labels: [], data: [] } as IChartData
		)
	);
</script>

<div class="stats-container">
	<BarChart {data} width={maxWidth} height={400} />
</div>

<style>
	.stats-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
