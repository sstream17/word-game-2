<script lang="ts">
	import { type GameStatus, type IHints } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import Answers from './Answers.svelte';
	import Keyboard from './Keyboard.svelte';

	const keyWidthRatio = 99;
	const keyHeightRatio = 135;
	const defaultGap = 9;

	interface IProps {
		hints: { [gameId: string]: IHints };
		answers: { [index: string]: string | null };
		gameStatus: GameStatus;
		/**
		 * The current guess is long enough to be submitted
		 */
		submittable: boolean;
		/**
		 * The current guess is invalid
		 */
		invalid: boolean;
		winIndexes: { [gameId: string]: number | undefined };
	}

	let { hints, answers, gameStatus, submittable, invalid, winIndexes }: IProps = $props();

	let screenWidth: number | null | undefined = $state();
	let maxWidth = $derived(Math.min(screenWidth ? screenWidth : Infinity, 500));
	let scaleFactor = $derived(maxWidth / (11 * keyWidthRatio)); // 10 keys + 0.5 gap on each side

	let keyWidth = $derived(keyWidthRatio * scaleFactor);
	let keyHeight = $derived(keyHeightRatio * scaleFactor);
	let keyGap = $derived(defaultGap * scaleFactor);

	let keyboardHeight = $derived(keyHeight * 3 + keyGap * 2 + 36);

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
			dispatch('key', { key: dataKey });
		}
	}
</script>

<svelte:window onkeydown={keydown} bind:innerWidth={screenWidth} />

<div class="controls" style={`height: ${keyboardHeight}px; padding-top: ${keyGap}px;`}>
	{#if gameStatus === 'won' || gameStatus === 'lost'}
		<Answers gameFinished={gameStatus === 'won' || gameStatus === 'lost'} {answers} {winIndexes} />
		<button onclick={restart} data-key="enter" class="restart selected">
			{gameStatus === 'won' ? 'you won :)' : `game over :(`} play again?
		</button>
	{:else}
		<Keyboard {submittable} {invalid} {keyGap} {keyHeight} {keyWidth} {hints} onKeyClick={update} />
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

	.restart {
		width: 75%;
		padding: 8px 16px;
		background-color: var(--color-unknown);
		border-radius: 4px;
		border: none;
	}

	.restart:focus,
	.restart:hover {
		background-color: var(--color-theme-1);
		outline: none;
	}
</style>
