import type { PageLoad } from './$types';
import { Game, NUMBER_TRIES } from '../game';

export const load = (({ params }) => {
	const numberOfGames = Math.max(1, Math.min(+(params.num ?? 1), 4));
	const storageKey = `word-game-${numberOfGames}`;
	const initialState = typeof localStorage === 'undefined' ? '' : localStorage.getItem(storageKey) ?? '';

	const game = new Game(initialState, numberOfGames);

	return {
		/**
		 * The number of games
		 */
		numberOfGames: game.numberOfGames,

		/**
		 * The player's guessed words so far
		 */
		guesses: game.guesses,

		/**
		 * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
		 * an exact match, and 'c' means a close match (right letter, wrong place)
		 */
		hints: game.hints,

		/**
		 * The correct answer, revealed if the game is over
		 */
		answers: game.hints[0].findLastIndex((guess) => !!guess) >= game.numberOfGames + NUMBER_TRIES - 1
			? game.answers
			: Object.keys(game.wordIndices).reduce<{ [gameIndex: string]: null }>((acc, currentIndex) => {
				acc[currentIndex] = null
				return acc;
			}, {})
	};
}) satisfies PageLoad;
