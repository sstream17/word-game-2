<script lang="ts">
	import { NUMBER_TRIES, type IGuess } from '$lib/types';
	import GuessRow from './GuessRow.svelte';

	interface IProps {
		guesses: IGuess[];
		rowIndex: number;
		numberOfGames: number;
		currentGuess: string;
		invalid: boolean;
		badGuess: boolean;
		won: boolean;
		winIndex: number;
		allWon: boolean;
	}

	const {
		guesses,
		rowIndex,
		numberOfGames,
		currentGuess,
		invalid,
		badGuess,
		won,
		winIndex,
		allWon
	}: IProps = $props();
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
