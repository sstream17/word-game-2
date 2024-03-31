<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		id: string;
		activeDescendant: string | undefined;
		children: Snippet;
	}
	let { id, activeDescendant, children }: IProps = $props();
</script>

<li {id} role="menuitem" class:focused={activeDescendant === id}>
	{@render children()}
</li>

<style>
	li[role='menuitem'] {
		padding: 0.5rem 4px;
		border-radius: 4px;
		text-align: start;
	}

	.focused,
	li[role='menuitem']:hover {
		outline: 2px solid var(--color-focus-ring);
	}
</style>
