<script lang="ts">
	import { WORD_LENGTH } from '$lib/types';

	interface IProps {
		guess: string;
		result: string;
		isCurrentRow: boolean;
	}

	const { guess, result, isCurrentRow }: IProps = $props();
</script>

<div class="row" class:current-row={isCurrentRow}>
	{#each { length: WORD_LENGTH } as _, column (column)}
		{@const answer = result[column]}
		{@const value = guess?.[column] ?? ''}
		{@const selected = isCurrentRow && column === guess.length}
		{@const exact = answer === 'x'}
		{@const close = answer === 'c'}
		{@const missing = answer === '_'}
		<div
			style:--_letter-anim-delay={`${column}`}
			class="letter"
			class:exact
			class:close
			class:missing
			class:selected
		>
			<span class="letter-text">{value}</span>
			<span class="visually-hidden">
				{#if exact}
					(correct)
				{:else if close}
					(present)
				{:else if missing}
					(absent)
				{:else}
					empty
				{/if}
			</span>
		</div>
	{/each}
</div>

<style>
	.row {
		height: var(--_tile-base-size);
		display: flex;
		gap: var(--_tile-gap);
	}

	.current-row {
		height: calc(var(--_tile-base-size) * var(--_current-row-scale));
	}

	.current-row .letter {
		transform: scaleY(var(--_current-row-scale));
		transform-origin: top center;
		font-size: 1.15em;
	}

	.current-row .letter-text {
		transform: scaleY(calc(1 / var(--_current-row-scale)));
	}

	.letter {
		width: var(--_tile-base-size);
		height: var(--_tile-base-size);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		text-transform: lowercase;
		border: none;
		border-radius: 2px;
		background-color: var(--color-unknown);
		margin: 0;
		color: var(--color-text);
		box-shadow: 0 0 2px var(--color-box-shadow);
	}
</style>
