<script lang="ts">
	import { isGameOver } from '$lib/api';
	import { WORD_LENGTH, type HintValues, type IGameData } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	interface IProps {
		data: IGameData;
		won: boolean;
		/**
		 * The current guess is long enough to be submitted
		 */
		submittable: boolean;
		/**
		 * The current guess is invalid
		 */
		invalid: boolean;
	}

	let { data, won, submittable, invalid } = $props<IProps>();

	const colorMap = {
		_: 'var(--color-mising)',
		c: 'var(--color-close)',
		x: 'var(--color-exact)',
		_Border: 'var(--color-mising)',
		cBorder: 'var(--color-close-border)',
		xBorder: 'var(--color-exact)'
	};

	/**
	 * A map of classnames for all letters that have been guessed,
	 * used for styling the keyboard
	 */
	let classnames: Record<string, HintValues[]> = $derived(
		Object.values(data.hints).reduce((output, hints, gameIndex) => {
			if (hints.length < 1) {
				return output;
			}

			return data.guesses.reduce((guessOut: Record<string, HintValues[]>, guess, guessIndex) => {
				if (guess.length !== WORD_LENGTH || !hints[guessIndex]) {
					return output;
				}

				guess.split('').forEach((letter, letterIndex) => {
					if (!guessOut[letter]) {
						guessOut[letter] = [];
					}

					// If this board has been won, show the letter as missing so it doesn't clutter the
					// other games. Otherwise update the color if the letter isn't already in the correct spot.
					if (hints.includes('xxxxx')) {
						guessOut[letter].splice(gameIndex, 1, '_');
					} else if (guessOut[letter][gameIndex] !== 'x') {
						if (guessOut[letter][gameIndex] === 'c' && hints[guessIndex][letterIndex] === '_') {
							return;
						}

						guessOut[letter].splice(gameIndex, 1, hints[guessIndex][letterIndex] as HintValues);
					}
				});

				return guessOut;
			}, output);
		}, {})
	);

	function getBackgroundForLetter(colors: Record<string, HintValues[]>, letter: string) {
		const letterColors = colors[letter];

		if (letterColors?.length === 1) {
			return `--quadrant1-color: ${colorMap[letterColors[0]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[0]]};
				--quadrant4-color: ${colorMap[letterColors[0]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[0]}Border`]};`;
		} else if (letterColors?.length === 2) {
			return `--quadrant1-color: ${colorMap[letterColors[1]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[0]]};
				--quadrant4-color: ${colorMap[letterColors[1]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[1]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[1]}Border`]};`;
		} else if (letterColors?.length == 4) {
			return `--quadrant1-color: ${colorMap[letterColors[1]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[2]]};
				--quadrant4-color: ${colorMap[letterColors[3]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[1]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[2]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[3]}Border`]};`;
		}
	}

	/**
	 * A map of descriptions for all letters that have been guessed,
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	let description: Record<string, string> = $derived(
		data.hints['0'].reduce((acc: Record<string, string>, answer, i) => {
			const guess = data.guesses[i];

			// Skip replacing this magic number
			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					acc[letter] = 'correct';
				} else if (!classnames[letter]) {
					acc[letter] = answer[i] === 'c' ? 'present' : 'absent';
				}
			}
			return acc;
		}, {})
	);

	const dispatch = createEventDispatcher();

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		const key = (event.target as HTMLButtonElement).getAttribute('data-key');

		dispatch('key', { key });
	}

	function restart() {
		dispatch('key', { key: 'restart' });
	}

	function badGuess() {
		dispatch('key', { key: 'badGuess' });
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		if (event.key === 'Enter' && won) {
			restart();
			return;
		}

		if (event.key === 'Enter' && !submittable) {
			badGuess();
			return;
		}

		const key = document.querySelector(`[data-key="${event.key}" i]`)?.getAttribute('data-key');

		if (key) {
			dispatch('key', { key });
		}
	}
</script>

<svelte:window onkeydown={keydown} />

<div class="controls">
	{#if won || isGameOver(data.hints, data.numberOfGames)}
		{#if !won && data.answers['0']}
			<p>the answer was "{Object.values(data.answers)}"</p>
		{/if}
		<button on:click={restart} data-key="enter" class="restart selected">
			{won ? 'you won :)' : `game over :(`} play again?
		</button>
	{:else}
		<div class="keyboard">
			{#snippet letter(key)}
				<button
					on:click|preventDefault={update}
					class="letter"
					data-key={key}
					style={getBackgroundForLetter(classnames, key)}
					aria-disabled={submittable}
					name="key"
					value={key}
					aria-label="{key} {description[key] || ''}"
				>
					{key}
				</button>
			{/snippet}

			<div class="row">
				{#each 'qwertyuiop' as key}
					{@render letter(key)}
				{/each}
			</div>

			<div class="row">
				<div class="spacer" />
				{#each 'asdfghjkl' as key}
					{@render letter(key)}
				{/each}
				<div class="spacer" />
			</div>

			<div class="row">
				<button on:click|preventDefault={update} data-key="backspace" name="key" value="backspace">
					<img src="back_icon.svg" alt="backspace" />
				</button>
				{#each 'zxcvbnm' as key}
					{@render letter(key)}
				{/each}
				<button
					on:click|preventDefault={update}
					data-key="enter"
					name="key"
					aria-disabled={!submittable || invalid}
				>
					<img src="send_icon.svg" alt="enter" />
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.selected {
		outline: 2px solid black;
	}

	.controls {
		align-self: flex-end;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: var(--keyboard-height);
		padding-top: 1rem;
		padding-bottom: var(--keyboard-padding-bottom);
		width: 100%;
		background: var(--color-bg-0);
		flex-shrink: 0;
	}

	.keyboard {
		--gap: 4px;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		height: 100%;
		width: calc(100% - 16px);
	}

	.keyboard .row {
		display: flex;
		justify-content: center;
		gap: var(--gap);
		width: 100%;
		flex: 1;
	}

	.keyboard button {
		background: var(--color-unguessed);
		color: var(--color-text);
		border-radius: 0.2rem;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		padding: 0;
		font-size: var(--letter-size);
	}

	.keyboard button img {
		pointer-events: none;
	}

	.keyboard .letter {
		--_quadrant1-color: var(--quadrant1-color, var(--color-unguessed));
		--_quadrant2-color: var(--quadrant2-color, var(--color-unguessed));
		--_quadrant3-color: var(--quadrant3-color, var(--color-unguessed));
		--_quadrant4-color: var(--quadrant4-color, var(--color-unguessed));
		--_quadrant1-color-border: var(--quadrant1-color-border, var(--color-unguessed));
		--_quadrant2-color-border: var(--quadrant2-color-border, var(--color-unguessed));
		--_quadrant3-color-border: var(--quadrant3-color-border, var(--color-unguessed));
		--_quadrant4-color-border: var(--quadrant4-color-border, var(--color-unguessed));
		background:
			conic-gradient(
					var(--_quadrant1-color) 0deg,
					var(--_quadrant1-color) 90deg,
					var(--_quadrant4-color) 90deg,
					var(--_quadrant4-color) 180deg,
					var(--_quadrant3-color) 180deg,
					var(--_quadrant3-color) 270deg,
					var(--_quadrant2-color) 270deg,
					var(--_quadrant2-color) 360deg
				)
				padding-box,
			conic-gradient(
					var(--_quadrant1-color-border) 0deg,
					var(--_quadrant1-color-border) 90deg,
					var(--_quadrant4-color-border) 90deg,
					var(--_quadrant4-color-border) 180deg,
					var(--_quadrant3-color-border) 180deg,
					var(--_quadrant3-color-border) 270deg,
					var(--_quadrant2-color-border) 270deg,
					var(--_quadrant2-color-border) 360deg
				)
				border-box;
		border: 2px solid transparent;

		flex: 1;
	}

	.keyboard .spacer {
		flex: 0.5;
	}

	.keyboard button:focus {
		outline: 2px solid black;
	}

	.keyboard button[data-key='enter'],
	.keyboard button[data-key='backspace'] {
		text-transform: uppercase;
		flex: 1.6;
	}

	.keyboard button[data-key='enter'][aria-disabled='true'] {
		opacity: 0.5;
	}

	.restart {
		width: 75%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 0.2rem;
		border: none;
	}

	.restart:focus,
	.restart:hover {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}
</style>
