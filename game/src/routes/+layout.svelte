<script lang="ts">
	import { browser } from '$app/environment';
	import { createThemeState } from '$lib/api';
	import type { Theme } from '$lib/types';
	import { setContext } from 'svelte';
	import Menu from './Menu.svelte';
	import './styles.css';

	const initialTheme = browser ? (localStorage.getItem('theme') as Theme) ?? 'system' : 'system';
	const theme = createThemeState(initialTheme);
	setContext('theme', theme);
</script>

<div class={`app ${theme.theme}`}>
	<main>
		<Menu />
		<slot />
	</main>
</div>
