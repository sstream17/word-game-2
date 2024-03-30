<script lang="ts">
	import { base } from '$app/paths';
	import ThemeToggle from './ThemeToggle.svelte';

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<div class="container">
	<button
		class="menu-button"
		onclick={toggleMenu}
		aria-haspopup="true"
		aria-controls="game-menu"
		aria-expanded={isOpen}
	>
		<span id="menu-label" class="visually-hidden">menu</span>
		<svg height="24" viewBox="0 -960 960 960" width="24">
			<use xlink:href="menu_icon.svg#icon_path" />
		</svg>
	</button>
	<ul
		role="menu"
		id="game-menu"
		aria-labelledby="menu-label"
		class="menu"
		class:visually-hidden={!isOpen}
	>
		{#if isOpen}
			<li role="menuitem"><a class="how-to-play" href={`${base}/how-to-play`}>How to play</a></li>
			<ThemeToggle />
		{/if}
	</ul>
</div>

<style>
	.container {
		--button-size: 24px;
		--container-padding: 16px;
		display: flex;
		flex-direction: row;
		justify-content: end;
		padding: var(--container-padding);
	}

	.menu-button {
		height: var(--button-size);
		width: var(--button-size);
		fill: var(--color-text);
        border-radius: 4px;
        /* reset button styles */
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	.menu-button:focus {
		outline: 2px solid var(--color-focus-ring);
	}

	.menu {
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: absolute;
		top: calc(var(--button-size) + var(--container-padding));
		width: 160px;
		padding: 8px;
		margin: 8px 0;
		border-radius: 4px;
		background-color: var(--color-menu-bg);
		filter: drop-shadow(4px 4px 8px var(--color-shadow));
		z-index: 100;
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
