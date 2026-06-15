<script lang="ts">
	import { type IStats } from '$lib/types';

	interface IProps {
		title: string;
		numberOfGames: number;
		stats: IStats;
	}

	const { title, numberOfGames, stats }: IProps = $props();

	const {
		gamesPlayed,
		gamesWon,
		sumOfFinishes,
		currentWinStreak,
		maxWinStreak,
		finishCounts,
		maxFinishCount
	} = $derived(stats);

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
			{ labels: [], data: [] } as { labels: string[]; data: number[] }
		)
	);

	const winPercentage = $derived(gamesPlayed !== 0 ? (gamesWon / gamesPlayed) * 100 : 0);
	const averageGuess = $derived(gamesPlayed !== 0 ? sumOfFinishes / gamesPlayed : 0);

	const maxHeight = 240;
	const lineHeight = 2;
	const maxBarHeight = `calc(${maxHeight}px - ${2 * lineHeight}em)`;

	function getAriaValueForBar(gamesWon: number): number {
		const percent = gamesWon > -1 && gamesPlayed !== 0 ? (gamesWon / gamesPlayed) * 100 : 0;
		return +percent.toFixed(2);
	}

	function getHeightForBar(gamesWon: number): string {
		return `--_bar-height: calc(${gamesWon / maxFinishCount} * ${maxBarHeight});`;
	}
</script>

<div class="stats-container">
	<h2>{title}</h2>
	<div class="stats-group">
		{#snippet stat({ title, value }: { title: string; value: string | number })}
			{@const labelId = `stat-${title}`}
			<div class="single-stat">
				<span id={labelId}>{title}</span>
				<span aria-labelledby={labelId}>{value}</span>
			</div>
		{/snippet}
		{@render stat({ title: 'Played', value: gamesPlayed })}
		{@render stat({ title: 'Won', value: `${+winPercentage.toFixed(2)}%` })}
		{@render stat({ title: 'Avg Guess', value: +averageGuess.toFixed(2) })}
		{@render stat({ title: 'Streak', value: currentWinStreak })}
		{@render stat({ title: 'Max Streak', value: maxWinStreak })}
	</div>
	<div
		class="stats-graph"
		style={`--_max-height: ${maxHeight}px; --_line-height: ${lineHeight}em;`}
	>
		{#each data.data as gamesWon, iterIndex}
			<div
				class="graph-column"
				role="meter"
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuenow={getAriaValueForBar(gamesWon)}
			>
				<span>{gamesWon}</span>
				<div class="graph-bar" style={getHeightForBar(gamesWon)}></div>
				<div>{data.labels[iterIndex]}</div>
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
		flex-direction: row;
		gap: 32px;
		align-items: end;
		text-align: center;
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
