<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		id: string;
		activeDescendant: string | undefined;
		children: Snippet;
	}

	let { id, activeDescendant, children }: IProps = $props();
</script>

<li role="presentation" class="menu-item" class:focused={activeDescendant === id}>
	{@render children()}
</li>

<style>
	.menu-item {
		padding: 0.5rem 4px;
		border-radius: 4px;
		text-align: start;
	}

	.menu-item:hover {
		background-color: var(--color-menu-hover);
	}

	.focused {
		outline: 2px solid var(--color-focus-ring);
	}

	:global(.menu-item-command) {
		display: flex;
		flex-direction: row;
		gap: 8px;
		outline: none;
		color: var(--color-text);
	}
</style>
