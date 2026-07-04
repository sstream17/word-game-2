<script lang="ts">
	import { getGameContext } from '$lib/state';
	import { NUMBER_TRIES } from '$lib/types';
	import GuessRow from './GuessRow.svelte';

	interface IProps {
		gameIndex: number;
		rowIndex: number;
		numberOfGames: number;
		currentGuess: string;
		invalid: boolean;
		badGuess: boolean;
		allWon: boolean;
	}

	const { gameIndex, rowIndex, numberOfGames, currentGuess, invalid, badGuess, allWon }: IProps =
		$props();

	const game = getGameContext();

	const won = $derived(game.value[gameIndex]?.status === 'won');
	const winIndex = $derived(game.value[gameIndex]?.winIndex ?? -1);
	const guesses = $derived(game.value[gameIndex]?.guesses ?? []);
</script>

<div class="game" class:playing={!won} class:won={allWon} class:bad-guess={badGuess} class:invalid>
	{#each { length: numberOfGames + NUMBER_TRIES } as _, row (row)}
		{@const current = !won ? row === rowIndex : row === winIndex}
		{@const guessToDisplay = current && !won ? currentGuess : (guesses[row]?.guess ?? '')}
		{@const resultToDisplay = guesses[row]?.result ?? ''}
		<h2 class="visually-hidden">Row {row + 1}</h2>
		<GuessRow guess={guessToDisplay} result={resultToDisplay} isCurrentRow={current} />
	{/each}
</div>

<style>
	.game {
		--_current-row-scale: 1.2;
		--_animation-grow-scale: 1.08;
		display: flex;
		flex-direction: column;
		font-size: var(--letter-size);
		gap: var(--_tile-gap);
	}
</style>
