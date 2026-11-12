<script lang="ts">
	import './colors.css';
	import './styles.css';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { createThemeState } from '$lib/api';
	import Version from '$lib/components/Version.svelte';
	import { getData } from '$lib/storage';
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';

	const initialTheme = browser ? (getData()?.theme ?? 'system-theme') : 'system-theme';
	const theme = createThemeState(initialTheme);
	setContext('theme', theme);

	let { children } = $props();
</script>

<svelte:head>
	<script>
		// Required to set the theme before the rest of the page loads.
		// Prevents flashing one theme then switching to another.
		if (document) {
			let theme = 'system-theme';
			try {
				const raw = localStorage.getItem('word-game');  // Have to direct read localStorage in this inline script
				const parsed = raw ? JSON.parse(raw) : null;
				theme = parsed?.theme ?? 'system-theme';
			} catch (error) {
				console.error('Error getting initial theme from localStorage', error);
			}
			document.documentElement.classList.add(theme);
		}
	</script>
</svelte:head>

<div class="app">
	<main>
		<Menu />
		{@render children?.()}
		{#if $page.route.id !== '/[num]'}
			<Version />
		{/if}
	</main>
</div>

<style>
	.app {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	main {
		height: 100%;
	}
</style>
