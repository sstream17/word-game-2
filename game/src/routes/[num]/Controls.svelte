<script lang="ts">
	import { getKeySizes } from '$lib/api';
	import { GAME_MAX_WIDTH, type GameStatus } from '$lib/types';
	import Answers from './Answers.svelte';
	import Keyboard from './Keyboard.svelte';

	interface IProps {
		gameStatus: GameStatus;
		/**
		 * The current guess is long enough to be submitted
		 */
		submittable: boolean;
		/**
		 * The current guess is invalid
		 */
		invalid: boolean;
		onKey: (key: string | null) => void;
	}

	let { gameStatus, submittable, invalid, onKey }: IProps = $props();

	let screenWidth: number | null | undefined = $state();

	const { keyWidth, keyHeight, keyGap, keyboardHeight } = $derived.by(() =>
		getKeySizes(screenWidth)
	);

	/**
	 * A map of descriptions for all letters that have been guessed,
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	// TODO

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		event.preventDefault();
		const key = (event.target as HTMLButtonElement).getAttribute('data-key');
		onKey(key);
	}

	function restart() {
		onKey('restart');
	}

	function badGuess() {
		onKey('badGuess');
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		const key = event.key;

		if (key === 'Enter' && gameStatus === 'won') {
			restart();
			return;
		}

		if (key === 'Enter' && !submittable) {
			badGuess();
			return;
		}

		const dataKey = document.querySelector(`[data-key="${key}" i]`)?.getAttribute('data-key');

		if (dataKey) {
			onKey(dataKey);
		}
	}
</script>

<svelte:window onkeydown={keydown} bind:innerWidth={screenWidth} />

<div class="controls" style:height={`${keyboardHeight}px`} style:padding-top={`${keyGap}px`}>
	{#if gameStatus === 'won' || gameStatus === 'lost'}
		<Answers gameFinished={gameStatus === 'won' || gameStatus === 'lost'} />
		<div class="restart-bg" style:--_max-width={`${GAME_MAX_WIDTH}px`}>
			<button onclick={restart} data-key="enter" class="restart selected">
				{gameStatus === 'won' ? 'you won :)' : `game over :(`} play again?
			</button>
		</div>
	{:else}
		<Keyboard {submittable} {invalid} {keyGap} {keyHeight} {keyWidth} onKeyClick={update} />
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

	.restart-bg {
		max-width: var(--_max-width);
		background-color: var(--color-unknown);
	}

	.restart {
		width: 100%;
		padding: 8px 16px;
		background-color: transparent;
		border-radius: 4px;
		border: none;
	}

	.restart:focus,
	.restart:hover {
		background-color: var(--color-menu-hover);
	}
</style>
