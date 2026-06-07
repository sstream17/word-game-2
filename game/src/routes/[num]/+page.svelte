<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { createGameState, storeWinStats } from '$lib/api';
	import { clearGameProgress, updateGameProgress } from '$lib/storage';
	import { BOARD_GAP, TILE_GAP, WORD_LENGTH } from '$lib/types';
	import { Game } from '../game';
	import type { PageData } from './$types';
	import Controls from './Controls.svelte';
	import GameBoard from './GameBoard.svelte';

	interface IProps {
		data: PageData;
	}

	let { data }: IProps = $props();

	const storedGame = createGameState(() => data);
	const gameInstance = Game.fromGamesState(storedGame.game);
	const instanceWinIndexes = gameInstance.getWinIndexes();
	const instanceAnswers = gameInstance.getAnswers();

	const numberOfGames = storedGame.game.numberOfGames;

	let screenWidth: number | null | undefined = $state();
	let numberOfColumns = $derived(numberOfGames === 1 ? 1 : 2);
	let availableWidth = $derived(
		numberOfColumns === 1 ? (screenWidth ? screenWidth * 0.8 : screenWidth) : null
	);
	let maxWidth = $derived(Math.min(availableWidth ?? Infinity, 450));
	let tileWidth = $derived(
		(maxWidth - (WORD_LENGTH + 1) * numberOfColumns * TILE_GAP) / (WORD_LENGTH * numberOfColumns)
	);

	let canAcceptInput = $state(true);
	let badGuess = $state(false);

	/** Whether the current guess can be submitted */
	let submittable = $derived(storedGame.game.currentGuess.length === WORD_LENGTH);

	function update(key: string) {
		if (badGuess) badGuess = false;

		const updatedGame = Game.fromGamesState(storedGame.game);

		if (key === 'backspace') {
			updatedGame.deleteLetterFromGuess();
			storedGame.game = updatedGame;
		} else if (storedGame.game.currentGuess.length < WORD_LENGTH) {
			updatedGame.updateGuess(key);
			storedGame.game = updatedGame;
		} else {
			// The guess is already long enough
			triedBadGuess();
		}
	}

	/**
	 * A 300 ms delay to be used when revealing a guess
	 */
	const delay = () => new Promise((resolve) => setTimeout(resolve, 300));

	async function animateGuess() {
		// canAcceptInput = false;
		await delay();
		// canAcceptInput = true;
	}

	async function submit() {
		const updatedGame = Game.fromGamesState(storedGame.game);

		const isBadGuess = !updatedGame.submitGuess();
		
		storedGame.game = updatedGame;
		updateGameProgress(updatedGame, numberOfGames);

		if (!isBadGuess) {
			await animateGuess();

			if (updatedGame.status === 'inProgress') {
				return;
			}

			const winIndexes = updatedGame.getWinIndexes();

			storeWinStats({
				numberOfGames: numberOfGames,
				won: updatedGame.status === 'won',
				winIndexes
			});
			return;
		}

		triedBadGuess();
	}

	async function restart() {
		clearGameProgress(numberOfGames);
		await invalidateAll();
		storedGame.game = data;
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

		if (window.MobileGame) {
			window.MobileGame.onKeyPress();
		}

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
	<title>Word Game</title>
	<meta name="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>

<svelte:window bind:innerWidth={screenWidth} />

<div class="wrapper">
	<h1 class="visually-hidden">Word Game</h1>

	<div class="form">
		<div class="scroll-area">
			<div
				class="boards-container"
				style={`--_vertical-scroll-padding: ${BOARD_GAP}px; --_flex-gap: ${TILE_GAP * 3}px; max-width: ${maxWidth}px;`}
			>
				{#each { length: numberOfGames } as _, board (board)}
					{@const winIndex = storedGame.game.value[board]?.winIndex}
					{@const thisBoardWon = storedGame.game.value[board]?.status === 'won'}
					{@const guesses = storedGame.game.value[board]?.guesses ?? []}
					<GameBoard
						rowIndex={storedGame.game.guessIndex}
						{numberOfGames}
						won={thisBoardWon}
						allWon={storedGame.game.status === 'won'}
						winIndex={winIndex ?? -1}
						currentGuess={storedGame.game.currentGuess}
						invalid={storedGame.game.isGuessInvalid}
						{guesses}
						{badGuess}
						{tileWidth}
					/>
				{/each}
			</div>
		</div>

		<Controls
			on:key={handleKey}
			hints={storedGame.game.hints}
			answers={instanceAnswers}
			gameStatus={storedGame.game.status}
			{submittable}
			invalid={storedGame.game.isGuessInvalid}
			winIndexes={instanceWinIndexes}
		/>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
	}

	.form {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.scroll-area {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;

		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.boards-container {
		align-self: center;
		display: flex;
		flex-wrap: wrap;
		flex-grow: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: var(--_flex-gap);
		padding-block: var(--_vertical-scroll-padding);
	}
</style>
