<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IGameData } from './game';

	interface IProps {
		data: IGameData;
		won: boolean;
		submittable: boolean;
	}

	let { data, won, submittable } = $props<IProps>();

	/**
	 * A map of classnames for all letters that have been guessed,
	 * used for styling the keyboard
	 */
	let classnames: Record<string, 'exact' | 'close' | 'missing'> = $derived(
		data.answers.reduce((acc: Record<string, 'exact' | 'close' | 'missing'>, answer, i) => {
			const guess = data.guesses[i];

			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					acc[letter] = 'exact';
				} else if (!acc[letter]) {
					acc[letter] = answer[i] === 'c' ? 'close' : 'missing';
				}
			}
			return acc;
		}, {})
	);

	/**
	 * A map of descriptions for all letters that have been guessed,
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	let description: Record<string, string> = $derived(
		data.answers.reduce((acc: Record<string, string>, answer, i) => {
			const guess = data.guesses[i];

			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					acc[letter] = 'correct';
				} else if (!classnames[letter]) {
					acc[letter] = answer[i] === 'c' ? 'present' : 'absent';
				}
			}
			return acc;
		}, {})
	);

	const dispatch = createEventDispatcher();

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		const key = (event.target as HTMLButtonElement).getAttribute('data-key');

		dispatch('key', { key });
	}

	function restart() {
		dispatch('key', { key: 'restart' });
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		if (event.key === 'Enter' && data.answers.at(-1) === 'xxxxx') {
			restart();
			return;
		}

		if (event.key === 'Enter' && !submittable) return;

		const key = document.querySelector(`[data-key="${event.key}" i]`)?.getAttribute('data-key');

		if (key) {
			dispatch('key', { key });
		}
	}
</script>

<svelte:window onkeydown={keydown} />

<div class="controls">
	{#if won || data.answers.length >= data.numberOfGames + 5}
		{#if !won && data.answer}
			<p>the answer was "{data.answer}"</p>
		{/if}
		<button on:click={restart} data-key="enter" class="restart selected">
			{won ? 'you won :)' : `game over :(`} play again?
		</button>
	{:else}
		<div class="keyboard">
			<button
				on:click|preventDefault={update}
				data-key="enter"
				class:selected={submittable}
				disabled={!submittable}>enter</button
			>

			<button on:click|preventDefault={update} data-key="backspace" name="key" value="backspace">
				back
			</button>

			{#each ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'] as row}
				<div class="row">
					{#each row as letter}
						<button
							on:click|preventDefault={update}
							data-key={letter}
							class={classnames[letter]}
							disabled={submittable}
							name="key"
							value={letter}
							aria-label="{letter} {description[letter] || ''}"
						>
							{letter}
						</button>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.selected {
		outline: 2px solid var(--color-theme-1);
	}

	.controls {
		text-align: center;
		justify-content: center;
		height: min(18vh, 10rem);
	}

	.keyboard {
		--gap: 0.2rem;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		height: 100%;
	}

	.keyboard .row {
		display: flex;
		justify-content: center;
		gap: 0.2rem;
		flex: 1;
	}

	.keyboard button,
	.keyboard button:disabled {
		--size: min(8vw, 4vh, 40px);
		background-color: white;
		color: black;
		width: var(--size);
		border: none;
		border-radius: 2px;
		font-size: calc(var(--size) * 0.5);
		margin: 0;
	}

	.keyboard button.exact {
		background: var(--color-theme-2);
		color: white;
	}

	.keyboard button.missing {
		opacity: 0.5;
	}

	.keyboard button.close {
		border: 2px solid var(--color-theme-2);
	}

	.keyboard button:focus {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}

	.keyboard button[data-key='enter'],
	.keyboard button[data-key='backspace'] {
		position: absolute;
		bottom: 0;
		width: calc(1.5 * var(--size));
		height: calc(1 / 3 * (100% - 2 * var(--gap)));
		text-transform: uppercase;
		font-size: calc(0.3 * var(--size));
		padding-top: calc(0.15 * var(--size));
	}

	.keyboard button[data-key='enter'] {
		left: calc(50% + 3.5 * var(--size) + 0.8rem);
	}

	.keyboard button[data-key='backspace'] {
		right: calc(50% + 3.5 * var(--size) + 0.8rem);
	}

	.keyboard button[data-key='enter']:disabled {
		opacity: 0.5;
	}

	.restart {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 2px;
		border: none;
	}

	.restart:focus,
	.restart:hover {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}
</style>
