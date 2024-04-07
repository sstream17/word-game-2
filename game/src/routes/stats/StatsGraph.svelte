<script lang="ts">
	import { NUMBER_TRIES, type GameStats } from '$lib/types';

	interface IProps {
		title: string;
		numberOfGames: number;
		stats: GameStats;
	}

	const { title, numberOfGames, stats }: IProps = $props();

	const winPercentage = stats['played'] !== 0 ? (stats['wins'] / stats['played']) * 100 : 0;
	const maxHeight = 200;
	const lineHeight = 2;

	const numberOfGuesses = [...Array(NUMBER_TRIES + 1).keys(), -1];

	function getHeightForBar(winIndex: number): string {
		const maxBarHeight = `calc(${maxHeight}px - ${lineHeight}em)`;
		let gamesWon = stats[winIndex];

		return `--_bar-height: calc(${gamesWon / stats['maxWins']} * ${maxBarHeight});`;
	}
</script>

<div class="stats-container">
	<h2>{title}</h2>
	<div>
		<span>Played {stats['played']}</span>
		<span>Won {winPercentage}%</span>
		<span>Streak {stats['streak']}</span>
		<span>Max streak {stats['maxStreak']}</span>
	</div>
	<div
		class="stats-graph"
		style={`--_max-height: ${maxHeight}px; --_line-height: ${lineHeight}em;`}
	>
		{#each numberOfGuesses as winIndex}
			<div class="graph-column">
				<div class="graph-bar" style={getHeightForBar(winIndex)} />
				<div>{winIndex === -1 ? 'L' : winIndex + numberOfGames}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.stats-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: var(--_line-height);
	}

	.stats-graph {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
		gap: 16px;
		height: var(--_max-height);
		max-width: 500px;
	}

	.graph-column {
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: center;
		gap: 4px;
		width: 24px;
	}

	.graph-bar {
		background-color: var(--color-exact);
		width: 100%;
		height: var(--_bar-height);
		border-radius: 4px 4px 0px 0px;
	}
</style>
