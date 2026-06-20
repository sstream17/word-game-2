<script lang="ts">
	import { getGameContext } from '$lib/state';
	import { NUMBER_TRIES, TILE_GAP, WORD_LENGTH, type IGuess } from '$lib/types';

	interface IProps {
		gameIndex: number;
		rowIndex: number; 
		numberOfGames: number;
		currentGuess: string;
		invalid: boolean;
		badGuess: boolean;
		tileWidth: number;
		allWon: boolean;
	}

	let {
		gameIndex,
		rowIndex,
		numberOfGames,
		currentGuess,
		invalid,
		badGuess,
		tileWidth,
		allWon,
	}: IProps = $props();

	const game = getGameContext();

	const won = $derived(game.value[gameIndex]?.status === 'won');
	const winIndex = $derived(game.value[gameIndex]?.winIndex ?? -1);
	const guesses = $derived(game.value[gameIndex]?.guesses ?? []);
</script>

<div
	class="game"
	class:playing={!won}
	class:won={allWon}
	class:bad-guess={badGuess}
	class:invalid
>
	{#each { length: numberOfGames + NUMBER_TRIES } as _, row (row)}
		{@const current = !won ? row === rowIndex : row === winIndex}
		<h2 class="visually-hidden">Row {row + 1}</h2>
		<div class="row" class:current-row={current}>
			{#if !won || (won && row <= winIndex)}
				{#each { length: WORD_LENGTH } as _, column (column)}
					{@const guess = !won && current ? currentGuess : guesses[row]?.guess}
					{@const answer = guesses[row]?.result[column]}
					{@const value = guess?.[column] ?? ''}
					{@const selected = current && column === guess.length}
					{@const exact = answer === 'x'}
					{@const close = answer === 'c'}
					{@const missing = answer === '_'}
					<div
						style={`--_letter-anim-delay: ${column};`}
						class="letter"
						class:exact
						class:close
						class:missing
						class:selected
					>
						<span class="letter-text">{value}</span>
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
					</div>
				{/each}
			{:else}
				{#each { length: WORD_LENGTH } as _, column (column)}
					<div class="letter missing">
						<span class="visually-hidden">empty</span>
					</div>
				{/each}
			{/if}
		</div>
	{/each}
</div>

<style>
	.game {
		--_current-row-scale: 1.2;
		--_animation-grow-scale: 1.08;
		display: flex;
		flex-direction: column;
		font-size: var(--letter-size);
		gap: var(--_tile-gap);
	}

	.row {
		height: var(--_tile-base-size);
		display: flex;
		gap: var(--_tile-gap);
	}

	.current-row {
		height: calc(var(--_tile-base-size) * var(--_current-row-scale));
	}

	.current-row .letter {
		transform: scaleY(var(--_current-row-scale));
		transform-origin: top center;
		font-size: 1.15em;
	}

	.current-row .letter-text {
		transform: scaleY(calc(1 / var(--_current-row-scale)));
	}

	.playing .current-row {
		z-index: 1;
		filter: drop-shadow(4px 4px 8px var(--color-shadow));
	}

	.playing.invalid .current-row .letter {
		color: var(--color-text-invalid);
	}

	.playing.invalid .current-row .letter-text::after {
		content: '';
		position: absolute;
		left: -6px;
		right: -6px;
		bottom: -4px;
		height: 4px;
		background-image:
			linear-gradient(45deg, var(--color-text-invalid) 50%, transparent 50%),
			linear-gradient(-45deg, var(--color-text-invalid) 45%, transparent 45%);
		background-size: 6px 4px;
		background-position:
			1px 0px,
			2px -1px;
	}

	.letter {
		width: var(--_tile-base-size);
		height: var(--_tile-base-size);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: lowercase;
		border: none;
		border-radius: 2px;
		background-color: var(--color-unknown);
		margin: 0;
		color: var(--color-text);
		box-shadow: 0 0 2px var(--color-box-shadow);
	}

	.letter.missing {
		background-color: var(--color-missing);
		color: var(--color-text-missing);
	}

	.letter.exact {
		background-color: var(--color-exact);
		color: var(--color-text-exact);
	}

	.letter.close {
		background-color: var(--color-close);
		border: 2px solid var(--color-close-border);
	}

	@media (prefers-reduced-motion: no-preference) {
		.playing .current-row::before {
			transition: background-color 0.6s;
		}
		.playing.bad-guess .current-row {
			animation: wiggle 0.5s;
		}

		.won .current-row .letter {
			animation: wave 0.5s;
			animation-delay: calc(var(--_letter-anim-delay) * 0.3s);
		}

		/* Use global style since the class is manually added in the script */
		:global(.animate-letter) {
			animation: scale-letter 0.5s;
		}

		.letter {
			transition: background-color, opacity;
			transition-duration: 0.6s, 0.6s;
		}
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

	@keyframes wave {
		0% {
			transform: scaleY(var(--_current-row-scale)) translateY(0);
		}
		10% {
			transform: scaleY(var(--_current-row-scale)) translateY(2px);
		}
		30% {
			transform: scaleY(var(--_current-row-scale)) translateY(-4px);
		}
		50% {
			transform: scaleY(var(--_current-row-scale)) translateY(6px);
		}
		70% {
			transform: scaleY(var(--_current-row-scale)) translateY(-4px);
		}
		90% {
			transform: scaleY(var(--_current-row-scale)) translateY(2px);
		}
		100% {
			transform: scaleY(var(--_current-row-scale)) translateY(0);
		}
	}

	@keyframes scale-letter {
		0% {
			transform: scale(1, var(--_current-row-scale));
		}
		50% {
			transform: scale(
				var(--_animation-grow-scale),
				calc(var(--_animation-grow-scale) * var(--_current-row-scale))
			);
		}
		100% {
			transform: scale(1, var(--_current-row-scale));
		}
	}
</style>
