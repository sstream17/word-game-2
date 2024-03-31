<script lang="ts">
	import type { Theme } from '$lib/types';
	import { getContext } from 'svelte';
	import MenuItem from './MenuItem.svelte';

	interface IProps {
		activeDescendant: string | undefined;
	}

	let { activeDescendant }: IProps = $props();

	const currentTheme = getContext('theme') as { theme: Theme };

	function update(event: MouseEvent) {
		document.documentElement.classList.remove(currentTheme.theme);

		const newTheme = (event.target as HTMLButtonElement).getAttribute('data-theme') as Theme;
		currentTheme.theme = newTheme;

		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.add(newTheme);
	}
</script>

<li role="presentation">
	<span id="theme-submenu">Theme</span>
	<ul role="menu" aria-labelledby="theme-submenu">
		{#each [['light-theme', 'Light'], ['dark-theme', 'Dark'], ['system-theme', 'System']] as [dataId, label]}
			<MenuItem id={dataId} {activeDescendant}>
				<button
					data-theme={dataId}
					on:click={update}
					tabindex="-1"
					class:current={currentTheme.theme === dataId}
				>
					{label}
				</button>
			</MenuItem>
		{/each}
	</ul>
</li>

<style>
	button {
		width: 100%;
		background: inherit;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		text-align: inherit;
	}
</style>
