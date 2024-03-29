<script lang="ts">
	import { createThemeState } from '$lib/api';
	import { setContext } from 'svelte';
	import './styles.css';
	import { browser } from '$app/environment';
	import type { Theme } from '$lib/types';

	const initialTheme = browser ? (localStorage.getItem('theme') as Theme) ?? 'system' : 'system';

	const theme = createThemeState(initialTheme);

	setContext('theme', theme);
</script>

<div class="app" class:dark={theme.theme === 'dark'}>
	<main>
		<slot />
	</main>
</div>
