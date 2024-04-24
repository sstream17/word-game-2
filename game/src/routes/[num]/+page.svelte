<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { createGameState, isGameOver, storeWinStats } from '$lib/api';
	import { WORD_LENGTH, type HintString } from '$lib/types';
	import { Game } from '../game';
	import { reduced_motion } from '../reduced-motion';
	import type { PageData } from './$types';
	import Controls from './Controls.svelte';
	import GameBoard from './GameBoard.svelte';

	interface IProps {
		data: PageData;
	}

	let { data }: IProps = $props();

	const storedGame = createGameState(data);

	const numberOfGames = storedGame.game.numberOfGames;
	const storageKey = `word-game-${numberOfGames}`;
	const statsStorageKey = `stats-${numberOfGames}`;

	let canAcceptInput = $state(true);
	let badGuess = $state(false);
	let invalid = $state(false);
	let currentGuessIndex = $state(Object.values(storedGame.game.hints)['0'].length || 0);

	let winIndexes: { [gameIndex: string]: number } = $state({});

	/** Whether or not the user has won */
	let won = $derived(
		Object.values(storedGame.game.hints).every((value) => value.includes('xxxxx'))
	);

	let gameOver = $derived(isGameOver(storedGame.game.hints, storedGame.game.numberOfGames));

	/** The current guess */
	let currentGuess = $derived(storedGame.game.guesses[currentGuessIndex] || '');

	/** Whether the current guess can be submitted */
	let submittable = $derived(currentGuess.length === WORD_LENGTH);

	/**
	 * For each board, store the index of a correctly guessed word, or -1 if no correct guess.
	 * @returns The greatest correctly guessed index
	 */
	function updateWinIndexes(hints: { [gameIndex: number]: HintString[] }) {
		let maxIndex = -1;
		Object.entries(hints).forEach(([gameIndex, gameHints]) => {
			const gameWinIndex = gameHints.findLastIndex((guess) => guess === 'xxxxx');
			winIndexes[gameIndex] = gameWinIndex;

			if (gameWinIndex > maxIndex) {
				maxIndex = gameWinIndex;
			}
		});

		return maxIndex;
	}

	function update(key: string) {
		if (badGuess) badGuess = false;
		if (invalid) invalid = false;

		if (key === 'backspace') {
			storedGame.game.guesses[currentGuessIndex] = storedGame.game.guesses[currentGuessIndex].slice(
				0,
				-1
			);
		} else if (currentGuess.length < WORD_LENGTH) {
			storedGame.game.guesses[currentGuessIndex] += key;
		} else {
			// The guess is already long enough
			triedBadGuess();
		}

		// After adding the letter check if the word is long enough and valid
		if (currentGuess.length === WORD_LENGTH) {
			const updatedGame = new Game(localStorage.getItem(storageKey) ?? '', numberOfGames);
			invalid = !updatedGame.validate(currentGuess);
		}
	}

	/**
	 * A 300 ms delay to be used when revealing a guess
	 */
	const delay = () => new Promise((resolve) => setTimeout(resolve, 300));

	async function animateGuess(guesses: string[], hints: { [gameIndex: string]: HintString[] }) {
		canAcceptInput = false;
		const lastHintIndex = hints['0'].findLastIndex((value) => !!value);

		for (let i = 0; i < WORD_LENGTH; i++) {
			for (const gameIndex of Object.keys(hints)) {
				const chars = hints[gameIndex][lastHintIndex].split('');
				if (storedGame.game.hints[gameIndex][lastHintIndex] === undefined) {
					storedGame.game.hints[gameIndex][lastHintIndex] = '' as HintString;
				}
				storedGame.game.hints[gameIndex][lastHintIndex] += chars[i] as HintString;
			}
			await delay();
		}
		storedGame.game.guesses = guesses;
		canAcceptInput = true;
	}

	async function submit() {
		const updatedGame = new Game(localStorage.getItem(storageKey) ?? '', numberOfGames);

		const isBadGuess = !updatedGame.enter([...currentGuess]);

		localStorage.setItem(storageKey, updatedGame.toString());

		if (!isBadGuess) {
			await animateGuess(updatedGame.guesses, updatedGame.hints);
			currentGuessIndex = currentGuessIndex + 1;

			const gameWonIndex = updateWinIndexes(updatedGame.hints);
			if (won || gameOver) {
				storeWinStats(statsStorageKey, numberOfGames, won ? gameWonIndex : -1);
				storedGame.game.answers = updatedGame.answers;
				currentGuessIndex = -1;
			}
			return;
		}

		triedBadGuess();
	}

	async function restart() {
		localStorage.removeItem(storageKey);
		await invalidateAll();
		storedGame.game = data;
		currentGuessIndex = 0;
	}

	function triedBadGuess() {
		// Set bad guess to false, then set it to true on the next frame.
		// This allows the animation to be run consecutively.
		if (badGuess) badGuess = false;

		requestAnimationFrame(() => {
			badGuess = true;
		});
	}

	function handleKey(event: any) {
		if (!canAcceptInput) {
			return;
		}

		MobileGame.onKeyPress();

		const key = event.detail.key;

		switch (key) {
			case 'enter':
				submit();
				break;
			case 'restart':
				restart();
				break;
			case 'badGuess':
				triedBadGuess();
				break;
			default:
				update(key);
				break;
		}
	}
</script>

<svelte:head>
	<title>Sverdle</title>
	<meta name="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>

<div class="wrapper">
	<h1 class="visually-hidden">Sverdle</h1>

	<div class="form">
		<div class="boards-container">
			{#each { length: numberOfGames } as _, board (board)}
				{@const hints = storedGame.game.hints[board]}
				{@const winIndex = hints.findIndex((hint) => hint === 'xxxxx')}
				{@const thisBoardWon = winIndex !== -1}
				<GameBoard
					rowIndex={currentGuessIndex}
					{numberOfGames}
					won={thisBoardWon}
					allWon={won}
					{winIndex}
					guesses={storedGame.game.guesses}
					{currentGuess}
					{hints}
					{badGuess}
					{invalid}
				/>
			{/each}
		</div>

		<Controls
			on:key={handleKey}
			data={storedGame.game}
			{won}
			{gameOver}
			{submittable}
			{invalid}
			{winIndexes}
		/>
	</div>
</div>

<style>
	.form {
		width: 100%;
		/* 100% of view height - 24px for menu button - 32px for menu padding */
		max-height: calc(100svh - 24px - 32px);
		max-width: 768px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.boards-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		width: 100%;
		gap: 16px;
		flex-basis: 100svh;
		padding: 8px 0;
	}
</style>
