<script lang="ts">
	import { getTileSizes } from '$lib/api';
	import GuessRow from '$lib/components/GuessRow.svelte';
	import { TILE_GAP } from '$lib/types';

	let screenWidth: number | null | undefined = $state();

	const { maxWidth: singleMaxWidth, tileWidth: singleTileWidth } = $derived.by(() =>
		getTileSizes(1, screenWidth)
	);
</script>

<svelte:head>
	<title>How to play Word Game</title>
	<meta name="description" content="How to play Word Game" />
</svelte:head>

<svelte:window bind:innerWidth={screenWidth} />

<div class="text-column">
	<h1>How to play</h1>

	<p>
		Word Game is a clone of <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>,
		the word guessing game. To play, enter a five-letter English word. For example:
	</p>

	<div
		class="game playing"
		style:max-width={`${singleMaxWidth}px`}
		style:--_tile-base-size={`${singleTileWidth}px`}
		style:--_tile-gap={`${TILE_GAP}px`}
	>
		<GuessRow guess={'trace'} result={'c_cx_'} isCurrentRow />
	</div>

	<p>
		The <span class="letter exact">c</span> is in the right place.
		<span class="letter close">t</span>
		and
		<span class="letter close">a</span>
		are the right letters, but in the wrong place. The other letters are wrong, and can be discarded.
		Let's make another guess:
	</p>

	<div
		class="game playing"
		style:max-width={`${singleMaxWidth}px`}
		style:--_tile-base-size={`${singleTileWidth}px`}
		style:--_tile-gap={`${TILE_GAP}px`}
	>
		<GuessRow guess={'trace'} result={'c_cx_'} isCurrentRow={false} />
		<GuessRow guess={'match'} result={'xxxxx'} isCurrentRow />
	</div>

	<p>This time we guessed right! You have <strong>six</strong> guesses to get the word.</p>
</div>

<style>
	.game {
		margin-inline: auto;
	}

	.letter {
		/* Styles shared with game board letters */
		position: relative;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: lowercase;
		border: none;
		border-radius: 2px;

		/* Styles specific to how-to-play letters */
		display: inline-flex;
		margin: 0 0.2rem;
		width: 1rem;
		height: 1rem;
		font-size: 1.1rem;
		padding: 0.75rem;
	}

	p {
		padding: 16px;
	}
</style>
