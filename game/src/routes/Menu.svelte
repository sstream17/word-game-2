<script lang="ts">
	import { base } from '$app/paths';
	import Icon from '$lib/components/Icon.svelte';
	import MenuItem from './MenuItem.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const listIds = ['how-to-play', 'stats', 'light-theme', 'dark-theme', 'system-theme'];

	let isOpen = $state(false);
	let activeDescendant: string | undefined = $state(undefined);

	let menuRef: HTMLUListElement;

	/**
	 * Open and focus on the menu, and set visual focus to the first item
	 */
	function openMenu() {
		isOpen = true;
		activeDescendant = listIds[0];
		menuRef.focus();
	}

	/**
	 * Close the menu and clear the focus
	 */
	function closeMenu() {
		isOpen = false;
		activeDescendant = undefined;
	}

	function toggleMenu() {
		isOpen ? closeMenu() : openMenu();
	}

	function handleBlur(event: FocusEvent) {
		const { currentTarget, relatedTarget } = event;

		// `currentTarget.contains()` is a function
		// @ts-ignore
		if (!currentTarget?.contains(relatedTarget)) {
			closeMenu();
		}
	}

	function getNextItem(activeDescendant: string | undefined, list: string[], direction: 1 | -1) {
		const currentIndex = list.findIndex((item) => item === activeDescendant);

		if (currentIndex === -1) {
			return list[0];
		}

		const length = list.length;
		const newIndex = (currentIndex + (direction % length) + length) % length;
		return list[newIndex];
	}

	function findFocusableElement(
		activeDescendant: string | undefined
	): HTMLButtonElement | HTMLAnchorElement | null {
		const clickedItem = activeDescendant ? document.getElementById(activeDescendant) : undefined;

		if (!clickedItem) {
			return null;
		}

		return clickedItem.querySelector('button, [href]');
	}

	function handleKeyDown(event: KeyboardEvent) {
		const { key } = event;

		switch (key.toUpperCase()) {
			case ' ':
			case 'ENTER':
				const clickedItem = findFocusableElement(activeDescendant);
				clickedItem?.click();
				event.stopPropagation();
				break;
			case 'DOWN':
			case 'ARROWDOWN':
				if (isOpen) {
					const nextItem = getNextItem(activeDescendant, listIds, 1);
					activeDescendant = nextItem;
				}
				break;
			case 'UP':
			case 'ARROWUP':
				if (isOpen) {
					const previousItem = getNextItem(activeDescendant, listIds, -1);
					activeDescendant = previousItem;
				}
				break;
			case 'END':
			case 'PAGEDOWN':
				if (isOpen) {
					activeDescendant = listIds.at(-1);
				}
				break;
			case 'HOME':
			case 'PAGEUP':
				if (isOpen) {
					activeDescendant = listIds[0];
				}
				break;
			case 'ESC':
			case 'ESCAPE':
			case 'TAB':
				closeMenu();
				break;
			default:
				break;
		}
	}
</script>

<div role="presentation" class="container" onfocusout={handleBlur} onkeydown={handleKeyDown}>
	<span id="menu-label" class="visually-hidden">menu</span>
	<button
		class="menu-button"
		onclick={toggleMenu}
		aria-haspopup="true"
		aria-controls="game-menu"
		aria-expanded={isOpen}
	>
		<span class="visually-hidden">toggle menu</span>
		<svg height="24" viewBox="0 -960 960 960" width="24">
			<use xlink:href="menu_icon.svg#icon_path" />
		</svg>
	</button>
	<ul
		role="menu"
		id="game-menu"
		aria-labelledby="menu-label"
		class="menu"
		class:visually-hidden={!isOpen}
		tabindex="-1"
		aria-activedescendant={activeDescendant}
		bind:this={menuRef}
	>
		{#if isOpen}
			<MenuItem id="how-to-play" {activeDescendant}>
				<a tabindex="-1" href={`${base}/how-to-play`}>
					<Icon path="info_icon.svg#icon_path" />
					How to play
				</a>
			</MenuItem>
			<MenuItem id="stats" {activeDescendant}>
				<a tabindex="-1" href={`${base}/stats`}>
					<Icon path="chart_icon.svg#icon_path" />
					Stats
				</a>
			</MenuItem>
			<ThemeToggle {activeDescendant} />
		{/if}
	</ul>
</div>

<style>
	.container {
		--button-size: 24px;
		--container-padding: 16px;
		display: flex;
		flex-direction: row;
		justify-content: end;
		padding: var(--container-padding);
	}

	.menu-button {
		height: var(--button-size);
		width: var(--button-size);
		fill: var(--color-text);
		border-radius: 4px;
		/* reset button styles */
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	.menu-button:focus {
		outline: 2px solid var(--color-focus-ring);
	}

	.menu {
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: absolute;
		top: calc(var(--button-size) + var(--container-padding));
		width: 160px;
		padding: 8px;
		margin: 8px 0;
		border-radius: 4px;
		background-color: var(--color-menu-bg);
		filter: drop-shadow(4px 4px 8px var(--color-shadow));
		z-index: 100;
	}

	a {
		color: var(--color-text);
	}
</style>
