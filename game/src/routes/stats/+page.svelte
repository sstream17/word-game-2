<script lang="ts">
	import type { PageData } from './$types';
	import SingleGameStats from './SingleGameStats.svelte';

	interface IProps {
		data: PageData;
	}

	let { data }: IProps = $props();

	const gameModes = [
		['Classic', 1],
		['Duo', 2],
		['Quad', 4]
	] as [string, number][];

	let screenWidth: number | null | undefined = $state();
	const maxWidth = $derived(Math.min(screenWidth ?? Infinity, 500));
</script>

<svelte:head>
	<title>Word Game stats</title>
	<meta name="description" content="Word Game stats" />
</svelte:head>

<svelte:window bind:innerWidth={screenWidth} />

<div class="scroll-area">
	<h1>Stats</h1>
	<div class="container">
		{#each gameModes as game (game[0])}
			{@const title = game[0]}
			{@const numberOfGames = game[1]}
			<SingleGameStats {title} {numberOfGames} {maxWidth} stats={data[numberOfGames]} />
		{/each}
	</div>
</div>

<style>
	.scroll-area {
		padding-block: 32px;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 64px;
		align-items: center;
		justify-content: flex-start;
		text-align: center;
		margin-bottom: 16px;
	}
</style>
