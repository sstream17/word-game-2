<script lang="ts">
	import { isGameOver } from '$lib/api';
	import { WORD_LENGTH, type HintValues, type IGameData } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	interface IProps {
		data: IGameData;
		won: boolean;
		submittable: boolean;
	}

	let { data, won, submittable } = $props<IProps>();

	const colorMap = {
		_: 'var(--color-mising)',
		c: 'var(--color-close)',
		x: 'var(--color-exact)'
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
						guessOut[letter].splice(gameIndex, 1, hints[guessIndex][letterIndex] as HintValues);
					}
				});

				return guessOut;
			}, output);
		}, {})
	);

	function getBackgroundForLetter(colors: Record<string, HintValues[]>, letter: string) {
		const letterColors = colors[letter];
		let quad1Color = 'var(--color-unguessed)';
		let quad2Color = 'var(--color-unguessed)';
		let quad3Color = 'var(--color-unguessed)';
		let quad4Color = 'var(--color-unguessed)';
		if (letterColors?.length === 1) {
			quad1Color = colorMap[letterColors[0]];
			quad2Color = colorMap[letterColors[0]];
			quad3Color = colorMap[letterColors[0]];
			quad4Color = colorMap[letterColors[0]];
		} else if (letterColors?.length === 2) {
			quad1Color = colorMap[letterColors[1]];
			quad2Color = colorMap[letterColors[0]];
			quad3Color = colorMap[letterColors[0]];
			quad4Color = colorMap[letterColors[1]];
		} else if (letterColors?.length == 4) {
			quad1Color = colorMap[letterColors[1]];
			quad2Color = colorMap[letterColors[0]];
			quad3Color = colorMap[letterColors[2]];
			quad4Color = colorMap[letterColors[3]];
		}

		return `conic-gradient(${quad1Color} 0deg,${quad1Color} 90deg,${quad4Color} 90deg,${quad4Color} 180deg,${quad3Color} 180deg,${quad3Color} 270deg,${quad2Color} 270deg,${quad2Color} 360deg);`;
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
					data-key={key}
					style="background: {getBackgroundForLetter(classnames, key)}"
					disabled={submittable}
					name="key"
					value={key}
					aria-label="{key} {description[key] || ''}"
				>
					{key}
				</button>
			{/snippet}
			{#each ['qwertyuiop', 'asdfghjkl'] as row}
				<div class="row">
					{#each row as key}
						{@render letter(key)}
					{/each}
				</div>
			{/each}

			<!-- Separating out last row so back and enter buttons can be placed here -->
			<div class="row">
				<button on:click|preventDefault={update} data-key="backspace" name="key" value="backspace">
					back
				</button>
				{#each 'zxcvbnm' as key}
					{@render letter(key)}
				{/each}
				<button on:click|preventDefault={update} data-key="enter" name="key" disabled={!submittable}
					>enter</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.selected {
		outline: 2px solid black;
	}

	.controls {
		text-align: center;
		justify-content: center;
		height: var(--keyboard-height);
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
		width: 100%;
	}

	.keyboard .row {
		display: flex;
		justify-content: center;
		gap: var(--gap);
		flex: 1;
	}

	.keyboard button,
	.keyboard button:disabled {
		--size: min(8.8vw, 40px);
		background-color: var(--color-unguessed);
		color: black;
		width: var(--size);
		border: none;
		border-radius: 0.2rem;
		font-size: calc(var(--size) * 0.5);
		margin: 0;
	}

	.keyboard button:focus {
		outline: 2px solid black;
	}

	.keyboard button[data-key='enter'],
	.keyboard button[data-key='backspace'] {
		width: calc(1.5 * var(--size));
		text-transform: uppercase;
		font-size: calc(0.3 * var(--size));
		padding-top: calc(0.15 * var(--size));
	}

	.keyboard button[data-key='enter']:disabled {
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
