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
		The <span class="exact">y</span> is in the right place. <span class="close">r</span> and
		<span class="close">t</span>
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
	span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8em;
		width: 2.4em;
		height: 2.4em;
		background-color: white;
		box-sizing: border-box;
		border-radius: 2px;
		border-width: 2px;
		color: rgba(0, 0, 0, 0.7);
	}

	.missing {
		background: rgba(255, 255, 255, 0.5);
		color: rgba(0, 0, 0, 0.5);
	}

	.close {
		border-style: solid;
		border-color: var(--color-theme-2);
	}

	.exact {
		background: var(--color-theme-2);
		color: white;
	}

	.example {
		display: flex;
		justify-content: flex-start;
		margin: 1rem 0;
		gap: 0.2rem;
	}

	.example span {
		font-size: 1.4rem;
	}

	p span {
		position: relative;
		border-width: 1px;
		border-radius: 1px;
		font-size: 0.4em;
		transform: scale(2) translate(0, -10%);
		margin: 0 1em;
	}
</style>
