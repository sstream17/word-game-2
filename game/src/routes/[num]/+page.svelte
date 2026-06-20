<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { storeWinStats } from '$lib/api';
	import { GamesState, setGameContext } from '$lib/state';
	import { clearGameProgress, updateGameProgress } from '$lib/storage';
	import { BOARD_GAP, TILE_GAP, WORD_LENGTH } from '$lib/types';
	import type { PageData } from './$types';
	import Controls from './Controls.svelte';
	import GameBoard from './GameBoard.svelte';

	interface IProps {
		data: PageData;
	}

	let { data }: IProps = $props();

	const storedGame = setGameContext(new GamesState(() => data));

	const numberOfGames = storedGame.numberOfGames;

	let screenWidth: number | null | undefined = $state();
	const numberOfColumns = $derived(numberOfGames === 1 ? 1 : 2);
	const availableWidth = $derived(
		screenWidth == null ? screenWidth : numberOfColumns === 1 ? screenWidth * 0.8 : screenWidth
	);
	const maxWidth = $derived(Math.min(availableWidth ?? Infinity, 450));
	const tileWidth = $derived(
		(maxWidth - (WORD_LENGTH + 1) * numberOfColumns * TILE_GAP) / (WORD_LENGTH * numberOfColumns)
	);

	let badGuess = $state(false);

	/** Whether the current guess can be submitted */
	let submittable = $derived(storedGame.currentGuess.length === WORD_LENGTH);

	function update(key: string) {
		if (badGuess) badGuess = false;

		if (key === 'backspace') {
			storedGame.deleteLetterFromGuess();
		} else if (storedGame.currentGuess.length < WORD_LENGTH) {
			storedGame.updateGuess(key);
		} else {
			// The guess is already long enough
			triedBadGuess();
		}
	}

	function submit() {
		const isBadGuess = !storedGame.submitGuess();

		updateGameProgress(storedGame.toStorage(), numberOfGames);

		if (!isBadGuess) {
			if (storedGame.status === 'inProgress') {
				return;
			}

			const winIndexes = storedGame.getWinIndexes();

			storeWinStats({
				numberOfGames: numberOfGames,
				won: storedGame.status === 'won',
				winIndexes
			});
			return;
		}

		triedBadGuess();
	}

	async function restart() {
		clearGameProgress(numberOfGames);
		await invalidateAll();
		storedGame.startGame(numberOfGames);
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
					<GameBoard
						gameIndex={board}
						rowIndex={storedGame.guessIndex}
						{numberOfGames}
						currentGuess={storedGame.currentGuess}
						invalid={storedGame.isGuessInvalid}
						{badGuess}
						{tileWidth}
						allWon={storedGame.status === 'won'}
					/>
				{/each}
			</div>
		</div>

		<Controls
			on:key={handleKey}
			hints={storedGame.hints}
			answers={storedGame.getAnswers()}
			gameStatus={storedGame.status}
			{submittable}
			invalid={storedGame.isGuessInvalid}
			winIndexes={storedGame.getWinIndexes()}
		/>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		height: 100%;
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
		padding-block-start: calc(var(--_vertical-scroll-padding) * 4);
	}
</style>
