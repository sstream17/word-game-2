<script lang="ts">
	import type { Theme } from '$lib/types';
	import { getContext } from 'svelte';

	const currentTheme = getContext('theme') as { theme: Theme };

	function update(event: MouseEvent) {
		document.documentElement.classList.remove(currentTheme.theme);

		const newTheme = (event.target as HTMLButtonElement).getAttribute('data-theme') as Theme;
		currentTheme.theme = newTheme;

		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.add(newTheme);
	}
</script>

{#each [['light-theme', 'Light'], ['dark-theme', 'Dark'], ['system-theme', 'System']] as [dataId, label]}
	<li role="menuitem">
		<button data-theme={dataId} on:click={update} class:current={currentTheme.theme === dataId}>
			{label}
		</button>
	</li>
{/each}
