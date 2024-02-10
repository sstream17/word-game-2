<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';
	import { WORD_LENGTH } from '$lib/types';
	import { confetti } from '@neoconfetti/svelte';
	import Controls from '../Controls.svelte';
	import GameBoard from '../GameBoard.svelte';
	import { Game } from '../game';
	import { reduced_motion } from '../reduced-motion';
	import type { PageData } from './$types';

	interface IProps {
		data: PageData;
	}

	let { data } = $props<IProps>();

	const numberOfGames = data.numberOfGames;
	const storageKey = `word-game-${numberOfGames}`;

	let badGuess = $state(false);
	let invalid = $state(false);

	/** Whether or not the user has won */
	let won = $derived(Object.values(data.hints).every((value) => value.includes('xxxxx')));

	/** The index of the current guess, based on the number of current hints */
	let i = $derived(won ? -1 : Object.values(data.hints)[0].length);

	/** The current guess */
	let currentGuess = $derived(data.guesses[i] || '');

	/** Whether the current guess can be submitted */
	let submittable = $derived(currentGuess.length === WORD_LENGTH);

	function update(key: string) {
		if (badGuess) badGuess = false;
		if (invalid) invalid = false;

		if (key === 'backspace') {
			data.guesses[i] = data.guesses[i].slice(0, -1);
		} else if (currentGuess.length < WORD_LENGTH) {
			data.guesses[i] += key;
		} else {
			// The guess is already long enough
			triedBadGuess();
		}

		// After adding the letter check if the word is long enough and valid
		if (currentGuess.length === WORD_LENGTH) {
			const game = new Game(localStorage.getItem(storageKey) ?? '', numberOfGames);
			invalid = !game.validate(currentGuess);
		}
	}

	function submit() {
		const game = new Game(localStorage.getItem(storageKey) ?? '', numberOfGames);

		const isBadGuess = !game.enter([...currentGuess]);

		localStorage.setItem(storageKey, game.toString());

		if (!isBadGuess) {
			invalidateAll();
			return;
		}

		triedBadGuess();
	}

	function restart() {
		localStorage.removeItem(storageKey);
		invalidateAll();
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
	<a class="how-to-play" href={`${base}/how-to-play`}>How to play</a>

	<div class="form">
		<div class="boards-container">
			{#each { length: numberOfGames } as _, game (game)}
				{@const hints = data.hints[game]}
				{@const winIndex = hints.findIndex((hint) => hint === 'xxxxx')}
				{@const thisBoardWon = winIndex !== -1}
				<GameBoard
					rowIndex={i}
					{numberOfGames}
					won={thisBoardWon}
					{winIndex}
					guesses={data.guesses}
					{currentGuess}
					{hints}
					{badGuess}
					{invalid}
				/>
			{/each}
		</div>

		<Controls on:key={handleKey} {data} {won} {submittable} {invalid} />
	</div>
</div>

{#if won}
	<div
		style="position: absolute; left: 50%; top: 30%"
		use:confetti={{
			particleCount: $reduced_motion ? 0 : undefined,
			force: 0.7,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
			colors: ['#ff3e00', '#40b3ff', '#676778']
		}}
	/>
{/if}

<style>
	.form {
		width: 100%;
		max-height: calc(100svh - 2rem);
		max-width: 768px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.how-to-play {
		color: var(--color-text);
	}

	.how-to-play::before {
		content: 'i';
		display: inline-block;
		font-size: 0.8em;
		font-weight: 900;
		width: 1em;
		height: 1em;
		padding: 0.2em;
		line-height: 1;
		border: 1.5px solid var(--color-text);
		border-radius: 50%;
		text-align: center;
		margin: 0 0.5em 0 0;
		position: relative;
		top: -0.05em;
	}

	.boards-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		width: 100%;
		gap: 1rem;
		flex-basis: 100svh;
	}
</style>
