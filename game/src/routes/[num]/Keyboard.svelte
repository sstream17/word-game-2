<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { IHints, KeyStatus } from '$lib/types';

	interface IProps {
		submittable: boolean;
		invalid: boolean;
		keyWidth: number;
		keyHeight: number;
		keyGap: number;
		hints: { [gameId: string]: IHints };
		onKeyClick: (event: MouseEvent) => void;
	}

	const { submittable, invalid, keyWidth, keyHeight, keyGap, hints, onKeyClick }: IProps = $props();

	const colorMap = {
		unknown: 'var(--color-unknown)',
		missing: 'var(--color-missing)',
		close: 'var(--color-close)',
		exact: 'var(--color-exact)',
		unknownBorder: 'var(--color-unknown)',
		missingBorder: 'var(--color-missing)',
		closeBorder: 'var(--color-close-border)',
		exactBorder: 'var(--color-exact)'
	};

	function getLetterColors(letter: string, hints?: { [gameId: string]: IHints }): KeyStatus[] {
		if (!hints) {
			return ['unknown', 'unknown', 'unknown', 'unknown'];
		}

		const colors = Object.keys(hints).map((gameId) => hints[gameId][letter]);

		switch (colors.length) {
			case 1:
				return [colors[0], colors[0], colors[0], colors[0]];
			case 2:
				return [colors[0], colors[1], colors[0], colors[1]];
			case 4:
				return colors;
			default:
				return ['unknown', 'unknown', 'unknown', 'unknown'];
		}
	}
	function getBackgroundForLetter(letter: string) {
		const letterSize = `width: ${keyWidth}px; height: ${keyHeight}px;`;

		const letterColors = getLetterColors(letter, hints);
		let backgroundColors = '';

		if (letterColors?.length === 1) {
			backgroundColors = `--quadrant1-color: ${colorMap[letterColors[0]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[0]]};
				--quadrant4-color: ${colorMap[letterColors[0]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[0]}Border`]};`;
		} else if (letterColors?.length === 2) {
			backgroundColors = `--quadrant1-color: ${colorMap[letterColors[1]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[0]]};
				--quadrant4-color: ${colorMap[letterColors[1]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[1]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[1]}Border`]};`;
		} else if (letterColors?.length == 4) {
			backgroundColors = `--quadrant1-color: ${colorMap[letterColors[1]]};
				--quadrant2-color: ${colorMap[letterColors[0]]};
				--quadrant3-color: ${colorMap[letterColors[2]]};
				--quadrant4-color: ${colorMap[letterColors[3]]};
				--quadrant1-color-border: ${colorMap[`${letterColors[1]}Border`]};
				--quadrant2-color-border: ${colorMap[`${letterColors[0]}Border`]};
				--quadrant3-color-border: ${colorMap[`${letterColors[2]}Border`]};
				--quadrant4-color-border: ${colorMap[`${letterColors[3]}Border`]};`;
		}

		return `${letterSize} ${backgroundColors}`;
	}
</script>

<div class="keyboard" style={`gap: ${keyGap * 2}px;`}>
	{#snippet letter(key: string)}
		<button
			onclick={onKeyClick}
			class="letter key"
			data-key={key}
			style={getBackgroundForLetter(key)}
			aria-disabled={submittable}
			name="key"
			value={key}
			aria-label={key}
		>
			{key}
		</button>
	{/snippet}

	<div class="row" style={`gap: ${keyGap}px;`}>
		{#each 'qwertyuiop' as key}
			{@render letter(key)}
		{/each}
	</div>

	<div class="row" style={`gap: ${keyGap}px;`}>
		<div class="spacer"></div>
		{#each 'asdfghjkl' as key}
			{@render letter(key)}
		{/each}
		<div class="spacer"></div>
	</div>

	<div class="row" style={`gap: ${keyGap}px;`}>
		<button
			class="key backspace-key"
			onclick={onKeyClick}
			data-key="backspace"
			name="key"
			value="backspace"
			style={`width: ${keyWidth * 1.5}px; height: ${keyHeight}px;`}
		>
			<span class="visually-hidden">backspace</span>
			<Icon path="back_icon.svg#icon_path" />
		</button>
		{#each 'zxcvbnm' as key}
			{@render letter(key)}
		{/each}
		<button
			class="key enter-key"
			onclick={onKeyClick}
			data-key="enter"
			name="key"
			aria-disabled={!submittable || invalid}
			style={`width: ${keyWidth * 1.5}px; height: ${keyHeight}px;`}
		>
			<span class="visually-hidden">enter</span>
			<Icon path="send_icon.svg#icon_path" />
		</button>
	</div>
</div>

<style>
	.keyboard {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: calc(100% - 16px);
	}

	.row {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.key {
		background-color: var(--color-unknown);
		color: var(--color-text);
		border-radius: 4px;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		padding: 0;
		font-size: var(--key-size);
	}

	.letter {
		--_quadrant1-color: var(--quadrant1-color, var(--color-unknown));
		--_quadrant2-color: var(--quadrant2-color, var(--color-unknown));
		--_quadrant3-color: var(--quadrant3-color, var(--color-unknown));
		--_quadrant4-color: var(--quadrant4-color, var(--color-unknown));
		--_quadrant1-color-border: var(--quadrant1-color-border, var(--color-unknown));
		--_quadrant2-color-border: var(--quadrant2-color-border, var(--color-unknown));
		--_quadrant3-color-border: var(--quadrant3-color-border, var(--color-unknown));
		--_quadrant4-color-border: var(--quadrant4-color-border, var(--color-unknown));
		background:
			conic-gradient(
					var(--_quadrant1-color) 0deg,
					var(--_quadrant1-color) 90deg,
					var(--_quadrant4-color) 90deg,
					var(--_quadrant4-color) 180deg,
					var(--_quadrant3-color) 180deg,
					var(--_quadrant3-color) 270deg,
					var(--_quadrant2-color) 270deg,
					var(--_quadrant2-color) 360deg
				)
				padding-box,
			conic-gradient(
					var(--_quadrant1-color-border) 0deg,
					var(--_quadrant1-color-border) 90deg,
					var(--_quadrant4-color-border) 90deg,
					var(--_quadrant4-color-border) 180deg,
					var(--_quadrant3-color-border) 180deg,
					var(--_quadrant3-color-border) 270deg,
					var(--_quadrant2-color-border) 270deg,
					var(--_quadrant2-color-border) 360deg
				)
				border-box;
		border: 2px solid transparent;
	}

	.spacer {
		flex: 0.5;
	}

	.key:focus {
		outline: 2px solid var(--color-focus-ring);
	}

	.enter-key,
	.backspace-key {
		text-transform: uppercase;
	}

	.enter-key[aria-disabled='true'] {
		opacity: 0.5;
	}
</style>
