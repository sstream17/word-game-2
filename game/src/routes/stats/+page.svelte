<script lang="ts">
	import type { PageData } from './$types';
	import StatsGraph from './StatsGraph.svelte';

	interface IProps {
		data: PageData;
	}

	let { data }: IProps = $props();

	const gameModes = [
		['Classic', 1],
		['Duo', 2],
		['Quad', 4]
	] as [string, number][];
</script>

<div class="container">
	{#each gameModes as game}
		{@const title = game[0]}
		{@const numberOfGames = game[1]}
		<StatsGraph {title} {numberOfGames} stats={data[numberOfGames]} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
        padding: 16px;
	}
</style>
