<script lang="ts">
	import type { Theme } from '$lib/types';
	import { getContext } from 'svelte';

	const currentTheme = getContext('theme') as { theme: Theme };

	function update(event: MouseEvent) {
		const newTheme = (event.target as HTMLButtonElement).getAttribute('data-theme') as Theme;
		currentTheme.theme = newTheme;
	}
</script>

{#each [['light', 'Light'], ['dark', 'Dark'], ['system', 'System']] as [dataId, label]}
	<button data-theme={dataId} on:click={update} class:current={currentTheme.theme === dataId}>
		{label}
	</button>
{/each}
