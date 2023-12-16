import type { PageLoad } from './$types';
import { Game } from '../game';

export const load = (({params}) => {
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
		answers: game.answers,

		/**
		 * The correct answer, revealed if the game is over
		 */
		answer: game.answers.length >= game.numberOfGames + 5 ? game.answer : null
	};
}) satisfies PageLoad;
