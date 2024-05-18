<script lang="ts">
	import { NUMBER_TRIES, WORD_LENGTH } from '$lib/types';

	interface IProps {
		numberOfGames: number;
		won: boolean;
		allWon: boolean;
		winIndex: number;
		badGuess: boolean;
		invalid: boolean;
		guesses: string[];
		currentGuess: string;
		hints: string[];
		rowIndex: number;
	}

	let {
		numberOfGames,
		won,
		allWon,
		winIndex,
		badGuess,
		invalid,
		guesses,
		currentGuess,
		hints,
		rowIndex
	}: IProps = $props();
</script>

<div class="game" class:playing={!won} class:won={allWon} class:bad-guess={badGuess} class:invalid>
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
					{@const animate = guess.length > column}
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
						class:animate
					>
						<span class="text">{value}</span>
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
		--_current-row-scale: 1.5;
		--_animation-grow-scale: 1.08;
		width: 45%;
		display: flex;
		flex-direction: column;
		font-size: var(--letter-size);
	}

	.game .row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 4px;
		margin: 0 0 4px 0;
		filter: drop-shadow(0px 8px 8px #00000000);
	}

	.game .row.current {
		margin-top: 1vh;
		margin-bottom: calc(1vh * var(--_current-row-scale));
	}

	.game .row.current .letter {
		transform: scaleY(var(--_current-row-scale));
		font-size: 1.15em;
	}

	.game .row.current .letter .text {
		transform: scaleY(calc(1 / var(--_current-row-scale)));
	}

	.game.playing .row.current {
		filter: drop-shadow(0px 8px 8px var(--color-shadow));
		flex-basis: 4vh;
		z-index: 1;
	}

	.game.playing.invalid .row.current .letter {
		color: var(--color-text-invalid);
	}

	.game.playing.invalid .row.current .letter::after,
	.game.playing.invalid .row.current .letter::before {
		height: inherit;
		width: 50%;
		background-size: 4px 130%;
		content: '';
		position: absolute;
	}

	.game.playing.invalid .row.current .letter::before {
		top: -2px;
		background-image: linear-gradient(45deg, var(--color-text-invalid) 35%, transparent 0),
			linear-gradient(-45deg, var(--color-text-invalid) 35%, transparent 0);
	}

	.game.playing.invalid .row.current .letter::after {
		top: 0px;
		background-image: linear-gradient(45deg, var(--color-unguessed) 35%, transparent 0),
			linear-gradient(-45deg, var(--color-unguessed) 35%, transparent 0);
	}

	.letter {
		height: 4vh;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: lowercase;
		box-sizing: border-box;
		border: none;
		border-radius: 2px;
		background-color: var(--color-unguessed);
		margin: 0;
		color: var(--color-text);
	}

	.letter.missing {
		background-color: var(--color-mising);
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
		.game .row {
			transition: filter 0.6s;
		}
		.game.playing.bad-guess .row.current {
			animation: wiggle 0.5s;
		}

		.game.won .row.current .letter {
			animation: wave 0.5s;
			animation-delay: calc(var(--_letter-anim-delay) * 0.3s);
		}

		.letter.animate {
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
