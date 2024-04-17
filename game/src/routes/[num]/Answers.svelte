<script lang="ts">
	interface IProps {
		gameFinished: boolean;
		answers: { [gameIndex: string]: string | null };
		winIndexes: { [gameIndex: string]: number };
	}

	let { gameFinished, answers, winIndexes }: IProps = $props();
</script>

{#if gameFinished && answers['0'] && winIndexes['0']}
	<div class="container">
		{#each Object.entries(answers) as [gameIndex, answer]}
			{@const numberOfGuesses = winIndexes[gameIndex] + 1}
			{@const missed = numberOfGuesses === 0}
			<div class="answer">
				<span>{answer}</span>
				<span class="guesses" class:missed>{!missed ? numberOfGuesses : ''}</span>
			</div>
		{/each}
	</div>
{/if}

<style>
	.container {
		--_container-gap: 24px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 16px;
		padding: 16px;
		width: 75%;
	}

	.answer {
		display: flex;
		flex-basis: calc(50% - var(--_container-gap));
		justify-content: flex-end;
		gap: 8px;
		font-size: 1.2rem;
	}

	.answer:only-child {
		flex-direction: row;
		justify-content: center;
	}

	.answer:nth-child(odd) {
		flex-direction: row;
	}

	.answer:nth-child(even) {
		flex-direction: row-reverse;
	}

	.guesses {
		background-color: var(--color-exact);
		color: var(--color-text-exact);
		padding: 4px;
		border-radius: 2px;
        width: 2ch;
	}

	.guesses.missed {
		background-color: var(--color-text-invalid);
	}

	.guesses.missed::before {
		content: '\00a0';
	}
</style>
