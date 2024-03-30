<script lang="ts">
	import { browser } from '$app/environment';
	import { createThemeState } from '$lib/api';
	import type { Theme } from '$lib/types';
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';
	import './styles.css';

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
	</main>
</div>
