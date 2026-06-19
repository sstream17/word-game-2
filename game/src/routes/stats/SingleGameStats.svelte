<script lang="ts">
	import type { IStats } from '$lib/types';
	import StatsGraph from './StatsGraph.svelte';
	import StatsRow from './StatsRow.svelte';

	interface IProps {
		numberOfGames: number;
		title: string;
		maxWidth: number;
		stats: IStats;
	}

	const { numberOfGames, title, maxWidth, stats }: IProps = $props();

	const { finishCounts, ...rest } = $derived(stats);
</script>

<div class="game-stats">
	<h2>{title}</h2>
	<StatsRow stats={rest} {maxWidth} />
	<StatsGraph {numberOfGames} {finishCounts} {maxWidth} />
</div>

<style>
	.game-stats {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
</style>
