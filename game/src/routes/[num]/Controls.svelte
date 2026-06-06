<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { WORD_LENGTH, type HintString, type HintValues } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import Answers from './Answers.svelte';

	const keyWidthRatio = 99;
	const keyHeightRatio = 135;
	const defaultGap = 9;

	interface IProps {
		hints: { [index: string]: HintString[] };
		guesses: string[];
		answers: { [index: string]: string | null };
		won: boolean;
		gameOver: boolean;
		/**
		 * The current guess is long enough to be submitted
		 */
		submittable: boolean;
		/**
		 * The current guess is invalid
		 */
		invalid: boolean;
		winIndexes: { [gameIndex: string]: number };
	}

	let { hints, guesses, answers, won, gameOver, submittable, invalid, winIndexes }: IProps =
		$props();

	let screenWidth: number | null | undefined = $state();
	let maxWidth = $derived(Math.min(screenWidth ? screenWidth : Infinity, 500));
	let scaleFactor = $derived(maxWidth / (11 * keyWidthRatio)); // 10 keys + 0.5 gap on each side

	let keyWidth = $derived(keyWidthRatio * scaleFactor);
	let keyHeight = $derived(keyHeightRatio * scaleFactor);
	let keyGap = $derived(defaultGap * scaleFactor);

	let keyboardHeight = $derived(keyHeight * 3 + keyGap * 2 + 36);

	const colorMap = {
		_: 'var(--color-missing)',
		c: 'var(--color-close)',
		x: 'var(--color-exact)',
		_Border: 'var(--color-missing)',
		cBorder: 'var(--color-close-border)',
		xBorder: 'var(--color-exact)'
	};

	/**
	 * A map of classnames for all letters that have been guessed,
	 * used for styling the keyboard
	 */
	let classnames: Record<string, HintValues[]> = $derived(
		Object.values(hints).reduce((output, currentHints, gameIndex) => {
			if (currentHints.length < 1) {
				return output;
			}

			return guesses.reduce((guessOut: Record<string, HintValues[]>, guess, guessIndex) => {
				if (guess.length !== WORD_LENGTH || !currentHints[guessIndex]) {
					return output;
				}

				guess.split('').forEach((letter, letterIndex) => {
					if (!guessOut[letter]) {
						guessOut[letter] = [];
					}

					// If this board has been won, show the letter as missing so it doesn't clutter the
					// other games. Otherwise update the color if the letter isn't already in the correct spot.
					if (currentHints.includes('xxxxx')) {
						guessOut[letter].splice(gameIndex, 1, '_');
					} else if (guessOut[letter][gameIndex] !== 'x') {
						if (
							guessOut[letter][gameIndex] === 'c' &&
							currentHints[guessIndex][letterIndex] === '_'
						) {
							return;
						}

						guessOut[letter].splice(
							gameIndex,
							1,
							currentHints[guessIndex][letterIndex] as HintValues
						);
					}
				});

				return guessOut;
			}, output);
		}, {})
	);

	function getBackgroundForLetter(colors: Record<string, HintValues[]>, letter: string) {
		const letterSize = `width: ${keyWidth}px; height: ${keyHeight}px;`;

		const letterColors = colors[letter];
		let backgroundColors = '';

		if (letterColors?.length === 1) {
			backgroundColors = `--quadrant1-color: ${colorMap[letterColors[0]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[0]]};
				--quadrant4-color: ${colorMap[letterColors[0]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[0]}Border`]};`;
		} else if (letterColors?.length === 2) {
			backgroundColors = `--quadrant1-color: ${colorMap[letterColors[1]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[0]]};
				--quadrant4-color: ${colorMap[letterColors[1]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[1]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[1]}Border`]};`;
		} else if (letterColors?.length == 4) {
			backgroundColors = `--quadrant1-color: ${colorMap[letterColors[1]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[2]]};
				--quadrant4-color: ${colorMap[letterColors[3]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[1]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[2]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[3]}Border`]};`;
		}

		return `${letterSize} ${backgroundColors}`;
	}

	/**
	 * A map of descriptions for all letters that have been guessed,
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	// TODO

	const dispatch = createEventDispatcher();

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		event.preventDefault();
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

		const key = event.key;

		if (key === 'Enter' && won) {
			restart();
			return;
		}

		if (key === 'Enter' && !submittable) {
			badGuess();
			return;
		}

		const dataKey = document.querySelector(`[data-key="${key}" i]`)?.getAttribute('data-key');

		if (dataKey) {
			dispatch('key', { key: dataKey });
		}
	}
</script>

<svelte:window onkeydown={keydown} bind:innerWidth={screenWidth} />

<div class="controls" style={`height: ${keyboardHeight}px; padding-top: ${keyGap}px;`}>
	{#if won || gameOver}
		<Answers gameFinished={won || gameOver} {answers} {winIndexes} />
		<button onclick={restart} data-key="enter" class="restart selected">
			{won ? 'you won :)' : `game over :(`} play again?
		</button>
	{:else}
		<div class="keyboard" style={`gap: ${keyGap * 2}px;`}>
			{#snippet letter(key: string)}
				<button
					onclick={update}
					class="letter key"
					data-key={key}
					style={getBackgroundForLetter(classnames, key)}
					aria-disabled={submittable}
					name="key"
					value={key}
					aria-label={key}
				>
					{key}
				</button>
			{/snippet}

			<div class="row" style={`gap: ${keyGap}px;`}>
				{#each 'qwertyuiop' as key}
					{@render letter(key)}
				{/each}
			</div>

			<div class="row" style={`gap: ${keyGap}px;`}>
				<div class="spacer"></div>
				{#each 'asdfghjkl' as key}
					{@render letter(key)}
				{/each}
				<div class="spacer"></div>
			</div>

			<div class="row" style={`gap: ${keyGap}px;`}>
				<button
					class="key backspace-key"
					onclick={update}
					data-key="backspace"
					name="key"
					value="backspace"
					style={`width: ${keyWidth * 1.5}px; height: ${keyHeight}px;`}
				>
					<span class="visually-hidden">backspace</span>
					<Icon path="back_icon.svg#icon_path" />
				</button>
				{#each 'zxcvbnm' as key}
					{@render letter(key)}
				{/each}
				<button
					class="key enter-key"
					onclick={update}
					data-key="enter"
					name="key"
					aria-disabled={!submittable || invalid}
					style={`width: ${keyWidth * 1.5}px; height: ${keyHeight}px;`}
				>
					<span class="visually-hidden">enter</span>
					<Icon path="send_icon.svg#icon_path" />
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.selected {
		outline: 2px solid var(--color-focus-ring);
	}

	.controls {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		background-color: var(--color-bg-0);
		flex-shrink: 0;
	}

	.keyboard {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: calc(100% - 16px);
	}

	.row {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.key {
		background-color: var(--color-unguessed);
		color: var(--color-text);
		border-radius: 4px;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		padding: 0;
		font-size: var(--key-size);
	}

	.letter {
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
	}

	.spacer {
		flex: 0.5;
	}

	.key:focus {
		outline: 2px solid var(--color-focus-ring);
	}

	.enter-key,
	.backspace-key {
		text-transform: uppercase;
	}

	.enter-key[aria-disabled='true'] {
		opacity: 0.5;
	}

	.restart {
		width: 75%;
		padding: 8px 16px;
		background-color: var(--color-unguessed);
		border-radius: 4px;
		border: none;
	}

	.restart:focus,
	.restart:hover {
		background-color: var(--color-theme-1);
		outline: none;
	}
</style>
