<script lang="ts">
	import type { Theme } from '$lib/types';
	import { getContext } from 'svelte';
	import MenuItem from './MenuItem.svelte';
	import Icon from '$lib/components/Icon.svelte';

	interface IProps {
		activeDescendant: string | undefined;
	}

	let { activeDescendant }: IProps = $props();

	const themes = [
		['light-theme', 'Light', 'theme_light_icon.svg#icon_path'],
		['dark-theme', 'Dark', 'theme_dark_icon.svg#icon_path'],
		['system-theme', 'System', 'theme_system_icon.svg#icon_path']
	];

	const currentTheme = getContext('theme') as { theme: Theme };

	function notifyInterface(theme: Theme) {
		if (!window.MobileGame) {
			return;
		}

		switch (theme) {
			case 'dark-theme':
				window.MobileGame.onDarkThemeSet();
				break;
			case 'light-theme':
				window.MobileGame.onLightThemeSet();
				break;
			case 'system-theme':
				window.MobileGame.onSystemThemeSet();
				break;
		}
	}

	function update(event: MouseEvent) {
		document.documentElement.classList.remove(currentTheme.theme);

		const newTheme = (event.target as HTMLButtonElement).getAttribute('data-theme') as Theme;
		currentTheme.theme = newTheme;

		notifyInterface(newTheme);

		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.add(newTheme);
	}
</script>

<li role="presentation">
	<span id="theme-submenu">Theme</span>
	<ul role="menu" aria-labelledby="theme-submenu">
		{#each themes as [dataId, label, iconPath]}
			{@const selected = currentTheme.theme === dataId}
			<MenuItem id={dataId} {activeDescendant}>
				<button data-theme={dataId} on:click={update} tabindex="-1" class:selected>
					<Icon path={selected ? `${iconPath}_enabled` : `${iconPath}_disabled`} />
					{label}
				</button>
			</MenuItem>
		{/each}
	</ul>
</li>

<style>
	button {
		width: 100%;
		background: inherit;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		text-align: inherit;
	}
</style>
