<script lang="ts">
	import type { IGameData } from './game';

	interface IProps {
		data: IGameData;
		won: boolean;
		badGuess: boolean;
		currentGuess: string;
		rowIndex: number;
	}

	let { won, badGuess, currentGuess, data, rowIndex } = $props<IProps>();
</script>

<div class="grid" class:playing={!won} class:bad-guess={badGuess}>
	{#each Array.from(Array(6).keys()) as row (row)}
		{@const current = row === rowIndex}
		<h2 class="visually-hidden">Row {row + 1}</h2>
		<div class="row" class:current>
			{#each Array.from(Array(5).keys()) as column (column)}
				{@const guess = current ? currentGuess : data.guesses[row]}
				{@const answer = data.answers[row]?.[column]}
				{@const value = guess?.[column] ?? ''}
				{@const selected = current && column === guess.length}
				{@const exact = answer === 'x'}
				{@const close = answer === 'c'}
				{@const missing = answer === '_'}
				<div class="letter" class:exact class:close class:missing class:selected>
					{value}
					<span class="visually-hidden">
						{#if exact}
							(correct)
						{:else if close}
							(present)
						{:else if missing}
							(absent)
						{:else}
							empty
						{/if}
					</span>
					<input name="guess" disabled={!current} type="hidden" {value} />
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
    .grid {
		--width: min(100vw, 40vh, 380px);
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.grid .row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.grid.bad-guess .row.current {
			animation: wiggle 0.5s;
		}
	}

	.grid.playing .row.current {
		filter: drop-shadow(3px 3px 10px var(--color-bg-0));
	}

	.letter {
		aspect-ratio: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}

	.letter.missing {
		background: rgba(255, 255, 255, 0.5);
		color: rgba(0, 0, 0, 0.5);
	}

	.letter.exact {
		background: var(--color-theme-2);
		color: white;
	}

	.letter.close {
		border: 2px solid var(--color-theme-2);
	}

	@keyframes wiggle {
		0% {
			transform: translateX(0);
		}
		10% {
			transform: translateX(-2px);
		}
		30% {
			transform: translateX(4px);
		}
		50% {
			transform: translateX(-6px);
		}
		70% {
			transform: translateX(+4px);
		}
		90% {
			transform: translateX(-2px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
