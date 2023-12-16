import { allowed, words } from "./words";

export interface IGameData {
	numberOfGames: number;
	guesses: string[];
	answers: string[];
	answer: string | null;
}

export class Game implements IGameData {
	numberOfGames: number;
	index: number;
	guesses: string[];
	answers: string[];
	answer: string;

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	constructor(serialized: string | undefined = undefined, numberOfGames: number = 1) {
		console.log("game const", numberOfGames)
		if (serialized) {
			const [numberOfGames, index, guesses, answers] = serialized.split('-');

			this.numberOfGames = +numberOfGames;
			this.index = +index;
			this.guesses = guesses ? guesses.split(' ') : [];
			this.answers = answers ? answers.split(' ') : [];
		} else {
			this.index = Math.floor(Math.random() * words.length);
			this.guesses = ['', '', '', '', '', ''];
			this.answers = [];
			this.numberOfGames = numberOfGames;
		}

		this.answer = words[this.index];
	}

	/**
	 * Update game state based on a guess of a five-letter word. Returns
	 * true if the guess was valid, false otherwise
	 */
	enter(letters: string[]) {
		const word = letters.join('');
		const valid = allowed.has(word);

		if (!valid) return false;

		this.guesses[this.answers.length] = word;

		const available = Array.from(this.answer);
		const answer = Array(5).fill('_');

		// first, find exact matches
		for (let i = 0; i < 5; i += 1) {
			if (letters[i] === available[i]) {
				answer[i] = 'x';
				available[i] = ' ';
			}
		}

		// then find close matches (this has to happen
		// in a second step, otherwise an early close
		// match can prevent a later exact match)
		for (let i = 0; i < 5; i += 1) {
			if (answer[i] === '_') {
				const index = available.indexOf(letters[i]);
				if (index !== -1) {
					answer[i] = 'c';
					available[index] = ' ';
				}
			}
		}

		this.answers.push(answer.join(''));

		return true;
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return `${this.numberOfGames}-${this.index}-${this.guesses.join(' ')}-${this.answers.join(' ')}`;
	}
}
