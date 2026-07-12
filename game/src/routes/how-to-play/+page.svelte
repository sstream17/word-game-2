<script lang="ts">
	import { getTileSizes } from '$lib/api';
	import GameBoard from '$lib/components/GameBoard.svelte';
	import GuessRow from '$lib/components/GuessRow.svelte';
	import { TILE_GAP } from '$lib/types';

	let screenWidth: number | null | undefined = $state();

	const { maxWidth: singleMaxWidth, tileWidth: singleTileWidth } = $derived.by(() =>
		getTileSizes(1, screenWidth)
	);

	const { maxWidth: doubleMaxWidth, tileWidth: doubleTileWidth } = $derived.by(() =>
		getTileSizes(2, screenWidth)
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
		class="boards-container"
		style:max-width={`${singleMaxWidth}px`}
		style:--_tile-base-size={`${singleTileWidth}px`}
		style:--_tile-gap={`${TILE_GAP}px`}
	>
		<div class="game playing">
			<GuessRow guess={'trace'} result={'c_cx_'} isCurrentRow />
		</div>
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
		class="boards-container"
		style:max-width={`${singleMaxWidth}px`}
		style:--_tile-base-size={`${singleTileWidth}px`}
		style:--_tile-gap={`${TILE_GAP}px`}
	>
		<div class="game playing">
			<GuessRow guess={'trace'} result={'c_cx_'} isCurrentRow={false} />
			<GuessRow guess={'match'} result={'xxxxx'} isCurrentRow />
		</div>
	</div>

	<p>This time we guessed right! You have <strong>six</strong> guesses to get the word.</p>

	<h2>Duo</h2>

	<p>
		Word Game also includes modes where you guess multiple words at once. In Duo mode, you try to
		reveal two words with the same guesses. For example:
	</p>

	<div
		class="boards-container"
		style:--_vertical-scroll-padding={'0px'}
		style:--_flex-gap={`${TILE_GAP * 3}px`}
		style:max-width={`${doubleMaxWidth}px`}
		style:--_tile-gap={`${TILE_GAP}px`}
		style:--_tile-base-size={`${doubleTileWidth}px`}
	>
		<GameBoard
			guesses={[
				{ guess: 'trace', result: 'c_cx_' },
				{ guess: 'match', result: 'xxxxx' },
				{ guess: '', result: '_____' },
				{ guess: '', result: '_____' },
				{ guess: '', result: '_____' },
				{ guess: '', result: '_____' },
				{ guess: '', result: '_____' }
			]}
			rowIndex={1}
			numberOfGames={2}
			currentGuess={''}
			invalid={false}
			badGuess={false}
			won={true}
			winIndex={1}
			allWon={false}
		/>
		<GameBoard
			guesses={[
				{ guess: 'trace', result: '____x' },
				{ guess: 'match', result: '_____' },
				{ guess: 'novel', result: '_xccc' }
			]}
			rowIndex={3}
			numberOfGames={2}
			currentGuess={''}
			invalid={false}
			badGuess={false}
			won={false}
			winIndex={-1}
			allWon={false}
		/>
	</div>
</div>

<style>
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

	h1,
	h2,
	p {
		padding-inline: 16px;
	}
</style>
