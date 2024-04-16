<script lang="ts">
	import './colors.css';
	import './styles.css';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { createThemeState } from '$lib/api';
	import Version from '$lib/components/Version.svelte';
	import type { Theme } from '$lib/types';
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';

	const initialTheme = browser
		? (localStorage.getItem('theme') as Theme) ?? 'system-theme'
		: 'system-theme';
	const theme = createThemeState(initialTheme);
	setContext('theme', theme);
</script>

<svelte:head>
	<script>
		// Required to set the theme before the rest of the page loads.
		// Prevents flashing one theme then switching to another.
		if (document) {
			const theme = localStorage.getItem('theme');
			document.documentElement.classList.add(theme);
		}
	</script>
</svelte:head>

<div class="app">
	<main>
		<Menu />
		<slot />
		{#if $page.route.id !== '/[num]'}
			<Version />
		{/if}
	</main>
</div>
