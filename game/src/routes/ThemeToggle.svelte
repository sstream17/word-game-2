<script lang="ts">
	import type { Theme } from '$lib/types';
	import { getContext } from 'svelte';

	const currentTheme = getContext('theme') as { theme: Theme };

	console.log(currentTheme.theme);

	function update(event: MouseEvent) {
		const newTheme = (event.target as HTMLButtonElement).getAttribute('data-theme') as Theme;

		currentTheme.theme = newTheme;

		if (newTheme === 'dark') {
			window.document.body.classList.add('dark');
			return;
		}

		window.document.body.classList.remove('dark');
	}
</script>

{#each [['light', 'Light'], ['dark', 'Dark'], ['system', 'System']] as [dataId, label]}
	<button data-theme={dataId} on:click={update} class:current={currentTheme.theme === dataId}>
		{label}
	</button>
{/each}
