<script lang="ts">
	import type { Theme } from '$lib/types';

	let currentTheme = $state(
		typeof localStorage === 'undefined' ? '' : localStorage.getItem('theme')
	);

	$effect(() => {
		currentTheme = localStorage.getItem('theme');
	});

	function update(event: MouseEvent) {
		const newTheme = (event.target as HTMLButtonElement).getAttribute('data-theme') as Theme;

		if (newTheme === 'dark') {
			window.document.body.classList.add('dark');
			return;
		}

		window.document.body.classList.remove('dark');
	}
</script>

{#each [['light', 'Light'], ['dark', 'Dark'], ['system', 'System']] as [dataId, label]}
	<button data-theme={dataId} on:click={update} class:current={currentTheme === dataId}>
		{label}
	</button>
{/each}
