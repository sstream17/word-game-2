import { browser } from '$app/environment';
import { isGameOver } from '$lib/api';
import { Game } from '../game';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const numberOfGames = Math.max(1, Math.min(+(params.num ?? 1), 4));
	const storageKey = `word-game-${numberOfGames}`;

	const initialState = browser ? localStorage.getItem(storageKey) ?? '' : '';

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
		 * Indexed object mapping a game to an array of strings like '__x_c' corresponding to the guesses,
		 * where 'x' means an exact match, and 'c' means a close match (right letter, wrong place)
		 */
		hints: game.hints,

		/**
		 * The correct answer, revealed if the game is over
		 */
		answers: isGameOver(game.hints, game.numberOfGames)
			? game.answers
			: Object.keys(game.wordIndices).reduce<{ [gameIndex: string]: null }>((acc, currentIndex) => {
				acc[currentIndex] = null
				return acc;
			}, {})
	};
}) satisfies PageLoad;
