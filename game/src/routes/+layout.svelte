<script lang="ts">
	import { createThemeState } from '$lib/api';
	import { setContext } from 'svelte';
	import './styles.css';

	const theme = createThemeState('dark');

	setContext('theme', theme);
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>
