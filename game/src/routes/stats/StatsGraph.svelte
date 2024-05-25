<script lang="ts">
	import { NUMBER_TRIES, type GameStats } from '$lib/types';

	interface IProps {
		title: string;
		numberOfGames: number;
		stats: GameStats;
	}

	const { title, numberOfGames, stats }: IProps = $props();

	const numberOfGuesses = [...Array(NUMBER_TRIES + 1).keys(), -1];

	// Sum of games won per number of guesses.
	// Losses count as +1 over the allowed max number of guesses.
	const guessSum = numberOfGuesses.reduce((sum, winIndex) => {
		const gamesWon = stats[winIndex] ?? 0;
		const guessScore = (winIndex === -1 ? NUMBER_TRIES + 1 : winIndex) + numberOfGames;
		return sum + guessScore * gamesWon;
	}, 0);

	const winPercentage = stats['played'] !== 0 ? (stats['wins'] / stats['played']) * 100 : 0;
	const averageGuesses = stats['played'] !== 0 ? guessSum / stats['played'] : 0;
	const maxHeight = 240;
	const lineHeight = 2;
	const maxBarHeight = `calc(${maxHeight}px - ${2 * lineHeight}em)`;

	function getAriaValueForBar(gamesWon: number): number {
		const gamesPlayed = stats['played'];
		const percent = gamesWon > -1 && gamesPlayed !== 0 ? (gamesWon / gamesPlayed) * 100 : 0;
		return +percent.toFixed(2);
	}

	function getHeightForBar(gamesWon: number): string {
		return `--_bar-height: calc(${gamesWon / stats['maxWins']} * ${maxBarHeight});`;
	}
</script>

<div class="stats-container">
	<h2>{title}</h2>
	<div class="stats-group">
		{#snippet stat({ title, value })}
			{@const labelId = `stat-${title}`}
			<div class="single-stat">
				<span id={labelId}>{title}</span>
				<span aria-labelledby={labelId}>{value}</span>
			</div>
		{/snippet}
		{@render stat({ title: 'Played', value: stats['played'] })}
		{@render stat({ title: 'Won', value: `${+winPercentage.toFixed(2)}%` })}
		{@render stat({ title: 'Avg Guess', value: +averageGuesses.toFixed(2) })}
		{@render stat({ title: 'Streak', value: stats['streak'] })}
		{@render stat({ title: 'Max Streak', value: stats['maxStreak'] })}
	</div>
	<div
		class="stats-graph"
		style={`--_max-height: ${maxHeight}px; --_line-height: ${lineHeight}em;`}
	>
		{#each numberOfGuesses as winIndex}
			{@const gamesWon = stats[winIndex]}
			<div
				class="graph-column"
				role="meter"
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuenow={getAriaValueForBar(gamesWon)}
			>
				<span>{gamesWon}</span>
				<div class="graph-bar" style={getHeightForBar(gamesWon)} />
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

	.stats-group {
		display: flex;
		gap: 2rem;
	}

	.single-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
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
