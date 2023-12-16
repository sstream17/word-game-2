<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';
	import { confetti } from '@neoconfetti/svelte';
	import type { PageData } from './$types';
	import Controls from './Controls.svelte';
	import { Game } from './game';
	import { reduced_motion } from './reduced-motion';
	import GameBoard from './GameBoard.svelte';

	interface IProps {
		data: PageData;
	}

	let { data } = $props<IProps>();

	let badGuess = $state(false);

	/** Whether or not the user has won */
	let won = $derived(data.answers.at(-1) === 'xxxxx');

	/** The index of the current guess */
	let i = $derived(won ? -1 : data.answers.length);

	/** The current guess */
	let currentGuess = $derived(data.guesses[i] || '');

	/** Whether the current guess can be submitted */
	let submittable = $derived(currentGuess.length === 5);

	function update(key: string) {
		if (key === 'backspace') {
			data.guesses[i] = data.guesses[i].slice(0, -1);
			if (badGuess) badGuess = false;
		} else if (currentGuess.length < 5) {
			data.guesses[i] += key;
		}
	}

	function submit() {
		const game = new Game(localStorage.getItem('sverdle') ?? '');

		if (!game.enter([...currentGuess])) {
			badGuess = true;
		}

		localStorage.setItem('sverdle', game.toString());
		invalidateAll();
	}

	function restart() {
		localStorage.removeItem('sverdle');
		invalidateAll();
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

<h1 class="visually-hidden">Sverdle</h1>

<div class="form">
	<a class="how-to-play" href={`${base}/how-to-play`}>How to play</a>

	<GameBoard rowIndex={i} {data} {won} {currentGuess} {badGuess} />
	<Controls on:key={handleKey} {data} {won} {submittable} />
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
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex: 1;
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
</style>
