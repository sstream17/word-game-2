<script lang="ts">
	import { NUMBER_TRIES, WORD_LENGTH } from '$lib/types';

	interface IProps {
		numberOfGames: number;
		won: boolean;
		winIndex: number;
		badGuess: boolean;
		invalid: boolean;
		guesses: string[];
		currentGuess: string;
		hints: string[];
		rowIndex: number;
	}

	let { numberOfGames, won, winIndex, badGuess, invalid, guesses, currentGuess, hints, rowIndex } =
		$props<IProps>();
</script>

<div class="game" class:playing={!won} class:bad-guess={badGuess} class:invalid>
	{#each { length: numberOfGames + NUMBER_TRIES } as _, row (row)}
		{@const current = !won ? row === rowIndex : row === winIndex}
		<h2 class="visually-hidden">Row {row + 1}</h2>
		<div class="row" class:current>
			{#if !won || (won && row <= winIndex)}
				{#each { length: WORD_LENGTH } as _, column (column)}
					{@const guess = !won && current ? currentGuess : guesses[row]}
					{@const answer = hints[row]?.[column]}
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
						<input name="guess" aria-disabled={!current} type="hidden" {value} />
					</div>
				{/each}
			{:else}
				{#each { length: WORD_LENGTH } as _, column (column)}
					<div class="letter missing">
						<span class="visually-hidden">empty</span>
						<input name="guess" aria-disabled={true} type="hidden" />
					</div>
				{/each}
			{/if}
		</div>
	{/each}
</div>

<style>
	.game {
		--game-width: 45%;
		width: var(--game-width);
		display: flex;
		flex-direction: column;
	}

	.game .row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.game.playing.bad-guess .row.current {
			animation: wiggle 0.5s;
		}
	}

	.game.playing .row.current {
		filter: drop-shadow(3px 3px 10px var(--color-bg-0));
		flex-basis: 4vh;
	}

	.game .row.current .letter {
		height: 6vh;
		font-size: 1.4rem;
	}

	.game.playing.invalid .row.current .letter {
		color: var(--color-text-invalid);
	}

	.letter {
		height: 4vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: lowercase;
		box-sizing: border-box;
		border: none;
		border-radius: 2px;
		background: white;
		margin: 0;
		color: var(--color-text);
	}

	.letter.missing {
		background: var(--color-mising);
		color: var(--color-text-missing);
	}

	.letter.exact {
		background: var(--color-exact);
	}

	.letter.close {
		background: var(--color-close);
		border: 2px solid var(--color-close-border);
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
