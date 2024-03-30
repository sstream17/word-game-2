<script lang="ts">
	import { base } from '$app/paths';
</script>

<h1>Sverdle</h1>

<div class="container">
	{#snippet card({ title, number })}
		<div class="card">
			<div class="game-rep">
				{#each { length: number } as _}
					<div class="fake-game" />
				{/each}
			</div>
			<span class="card-text">{title}</span>
		</div>
	{/snippet}
	<a href={`${base}/1`}>{@render card({ title: 'Classic', number: 1 })}</a>
	<a href={`${base}/2`}>{@render card({ title: 'Duo', number: 2 })}</a>
	<a href={`${base}/4`}>{@render card({ title: 'Quad', number: 4 })}</a>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
        align-items: center;
		gap: 4vw;
        margin: 20svh auto;
	}

	.card {
		width: 40vw;
        padding: 24px 0;
		background-color: var(--color-unguessed);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.game-rep {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
        justify-content: center;
		gap: 1vw;
        width: 50%;
	}

	.fake-game {
		aspect-ratio: 1;
		width: 45%;
		background-color: var(--color-bg-0);
	}
</style>
