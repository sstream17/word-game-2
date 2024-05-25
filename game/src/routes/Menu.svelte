<script lang="ts">
	import { base } from '$app/paths';
	import Icon from '$lib/components/Icon.svelte';
	import MenuItem from './MenuItem.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const listIds = ['how-to-play', 'stats', 'light-theme', 'dark-theme', 'system-theme'];

	let isOpen = $state(false);
	let activeDescendant: string | undefined = $state(undefined);

	let menuRef: HTMLUListElement;

	function onOpen() {
		isOpen = true;
	}

	function onClose() {
		isOpen = false;
		activeDescendant = undefined;
	}

	function handleBlur(event: FocusEvent) {
		const { currentTarget, relatedTarget } = event;

		// `currentTarget.contains()` is a function
		// @ts-ignore
		if (!currentTarget?.contains(relatedTarget)) {
			if (!isOpen) {
				return;
			}

			onClose();
			menuRef.hidePopover();
		}
	}

	function popoverListener(node: HTMLUListElement) {
		function handlePopoverToggle(event: ToggleEvent) {
			if (event.newState === 'open') {
				onOpen();
			} else {
				onClose();
			}
		}

		node.addEventListener('toggle', handlePopoverToggle as EventListener);

		return {
			destroy() {
				node.removeEventListener('toggle', handlePopoverToggle as EventListener);
			}
		};
	}

	function tryToFocusOn(id: string | undefined) {
		if (!id) {
			return;
		}

		const element = document.getElementById(id);
		if (element) {
			element.focus();
			activeDescendant = id;
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

	function keyboardListeners(node: HTMLDivElement) {
		function handleKeyDown(event: KeyboardEvent) {
			const { key } = event;

			switch (key.toUpperCase()) {
				case 'DOWN':
				case 'ARROWDOWN':
					if (!isOpen) {
						menuRef.showPopover();
					}
					event.preventDefault();
					const nextItem = getNextItem(activeDescendant, listIds, 1);
					activeDescendant = nextItem;
					tryToFocusOn(nextItem);
					break;
				case 'UP':
				case 'ARROWUP':
					if (!isOpen) {
						menuRef.showPopover();
					}
					event.preventDefault();
					const previousItem = getNextItem(activeDescendant, listIds, -1);
					activeDescendant = previousItem;
					tryToFocusOn(previousItem);
					break;
				case 'END':
				case 'PAGEDOWN':
					if (isOpen) {
						event.preventDefault();
						const lastItem = listIds.at(-1);
						activeDescendant = lastItem;
						tryToFocusOn(lastItem);
					}
					break;
				case 'HOME':
				case 'PAGEUP':
					if (isOpen) {
						event.preventDefault();
						const firstItem = listIds[0];
						activeDescendant = firstItem;
						tryToFocusOn(firstItem);
					}
					break;
				default:
					break;
			}
		}

		node.addEventListener('keydown', handleKeyDown);

		return {
			destroy() {
				node.removeEventListener('keydown', handleKeyDown);
			}
		};
	}
</script>

<div class="container" onfocusout={handleBlur} use:keyboardListeners>
	<button
		class="menu-button"
		popovertarget="menu-popover"
		aria-haspopup="true"
		aria-controls="menu-popover"
	>
		<span class="visually-hidden">toggle menu</span>
		<svg height="24" viewBox="0 -960 960 960" width="24">
			<use xlink:href="menu_icon.svg#icon_path" />
		</svg>
	</button>
	<ul
		role="menu"
		id="menu-popover"
		class="menu-list"
		popover="auto"
		tabindex="-1"
		aria-activedescendant={activeDescendant}
		bind:this={menuRef}
		use:popoverListener
	>
		<MenuItem id="how-to-play" {activeDescendant}>
			<a
				id="how-to-play"
				role="menuitem"
				class="menu-item-command"
				tabindex="-1"
				href={`${base}/how-to-play`}
			>
				<Icon path="info_icon.svg#icon_path" />
				How to play
			</a>
		</MenuItem>
		<MenuItem id="stats" {activeDescendant}>
			<a id="stats" role="menuitem" class="menu-item-command" href={`${base}/stats`}>
				<Icon path="chart_icon.svg#icon_path" />
				Stats
			</a>
		</MenuItem>
		<ThemeToggle {activeDescendant} />
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

	:global(.menu-list) {
		list-style: none;
		padding: 0;
		outline: none;
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

	#menu-popover {
		position: absolute;
		inset: unset;
		top: calc(8px + var(--button-size) + var(--container-padding));
		right: var(--container-padding);
	}

	:popover-open {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 160px;
		padding: 8px;
		border-radius: 4px;
		border: none;
		background-color: var(--color-menu-bg);
		filter: drop-shadow(4px 4px 8px var(--color-shadow));
	}
</style>
