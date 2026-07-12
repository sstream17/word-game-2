<script>
	import GuessRow from '$lib/components/GuessRow.svelte';
</script>

<svelte:head>
	<title>How to play Word Game</title>
	<meta name="description" content="How to play Word Game" />
</svelte:head>

<div class="text-column">
	<h1>How to play</h1>

	<p>
		Word Game is a clone of <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>,
		the word guessing game. To play, enter a five-letter English word. For example:
	</p>

	<div class="game playing" style:--_tile-base-size={'85.2px'} style:--_tile-gap={'4px'}>
		<GuessRow guess={'ritzy'} result={'c_c_x'} isCurrentRow />
	</div>

	<p>
		The <span class="letter exact">y</span> is in the right place.
		<span class="letter close">r</span>
		and
		<span class="letter close">t</span>
		are the right letters, but in the wrong place. The other letters are wrong, and can be discarded.
		Let's make another guess:
	</p>

	<div class="game playing" style:--_tile-base-size={'85.2px'} style:--_tile-gap={'4px'}>
		<GuessRow guess={'ritzy'} result={'c_c_x'} isCurrentRow={false} />
		<GuessRow guess={'party'} result={'xxxxx'} isCurrentRow />
	</div>

	<p>This time we guessed right! You have <strong>six</strong> guesses to get the word.</p>
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
</style>
