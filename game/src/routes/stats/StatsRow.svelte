<script lang="ts">
	import type { IStats } from '$lib/types';

	interface IProps {
		stats: Omit<IStats, 'finishCounts'>;
		maxWidth: number;
	}

	const { stats, maxWidth }: IProps = $props();

	const { gamesPlayed, gamesWon, sumOfFinishes, currentWinStreak, maxWinStreak } = $derived(stats);

	const winPercentage = $derived(gamesPlayed !== 0 ? (gamesWon / gamesPlayed) * 100 : 0);
	const averageGuess = $derived(gamesPlayed !== 0 ? sumOfFinishes / gamesPlayed : 0);
</script>

<div class="stats-row" style:width={`${maxWidth}px`}>
	<div class="single-stat">
		<span class="text-center">Played</span>
		<span class="text-center">{gamesPlayed}</span>
	</div>
	<div class="single-stat">
		<span class="text-center">Won</span>
		<span class="text-center">{`${+winPercentage.toFixed(2)}%`}</span>
	</div>
	<div class="single-stat">
		<span class="text-center">Avg Guess</span>
		<span class="text-center">
			{+averageGuess.toFixed(2)}
		</span>
	</div>
	<div class="single-stat">
		<span class="text-center">Streak</span>
		<span class="text-center">{currentWinStreak}</span>
	</div>
	<div class="single-stat">
		<span class="text-center">Max Streak</span>
		<span class="text-center">{maxWinStreak}</span>
	</div>
</div>

<style>
	.stats-row {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
		text-align: center;
		padding-inline: 8px;
		gap: 8px;
	}

	.single-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}

	.text-center {
		text-align: center;
	}
</style>
