import { NUMBER_TRIES, WORD_LENGTH, type HintString, type HintValues, type IGameData } from '$lib/types';
import { allowed, words } from './words';

export class Game implements IGameData {
	numberOfGames: number;
	wordIndices: { [gameIndex: string]: number };
	guesses: string[];
	hints: { [gameIndex: string]: HintString[] };
	answers: { [gameIndex: string]: string };

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	constructor(serialized: string | undefined = undefined, numberOfGames = 1) {
		if (serialized) {
			const [gameIndicesPacked, wordIndicesPacked, guesses, hintsPacked] = serialized.split('-');

			const gameIndices = gameIndicesPacked.split(',');
			const wordIndices = wordIndicesPacked.split(',');
			const hints = hintsPacked.split(' ');

			this.numberOfGames = numberOfGames;
			this.wordIndices = gameIndices.reduce<{ [gameIndex: string]: number }>((acc, currentIndex, i) => {
				acc[currentIndex] = +wordIndices[i];
				return acc;
			}, {});
			this.guesses = guesses ? guesses.split(' ') : [];
			this.hints = gameIndices.reduce<{ [gameIndex: string]: HintString[] }>((acc, currentIndex, i) => {
				acc[currentIndex] = hints[i] ? hints[i].split(',') as HintString[] : [];
				return acc;
			}, {});
		} else {
			this.numberOfGames = numberOfGames;
			this.wordIndices = Array.from({ length: numberOfGames }, (_, i) =>
				[`${i}`, Math.floor(Math.random() * words.length)])
				.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
			this.guesses = Array(numberOfGames + NUMBER_TRIES).fill('');
			this.hints = Object.keys(this.wordIndices).reduce<{ [gameIndex: string]: HintString[] }>((acc, currentIndex) => {
				acc[currentIndex] = []
				return acc;
			}, {});
		}

		this.answers = Object.keys(this.wordIndices).reduce<{ [gameIndex: string]: string }>((acc, currentIndex) => {
			acc[currentIndex] = words[this.wordIndices[currentIndex]]
			return acc;
		}, {});
	}

	/**
	 * Validate whether the current guess is in the list of allowed words
	 * @returns True if the guess was valid, false otherwise
	 */
	validate(word: string) {
		return allowed.has(word);
	}

	/**
	 * Update game state based on a guess of a five-letter word
	 * @returns True if the guess was valid, false otherwise
	 */
	enter(letters: string[]) {
		const word = letters.join('');

		if (!this.validate(word)) {
			return false;
		}

		this.guesses[Object.values(this.hints)[0].length] = word;

		Object.entries(this.answers).forEach(([answerIndex, currentAnswer]) => {
			const available = Array.from(currentAnswer);
			const hint = Array(WORD_LENGTH).fill('_') as HintValues[];

			// first, find exact matches
			for (let i = 0; i < WORD_LENGTH; i += 1) {
				if (letters[i] === available[i]) {
					hint[i] = 'x';
					available[i] = ' ';
				}
			}

			// then find close matches (this has to happen
			// in a second step, otherwise an early close
			// match can prevent a later exact match)
			for (let i = 0; i < WORD_LENGTH; i += 1) {
				if (hint[i] === '_') {
					const index = available.indexOf(letters[i]);
					if (index !== -1) {
						hint[i] = 'c';
						available[index] = ' ';
					}
				}
			}

			this.hints[answerIndex].push(hint.join('') as HintString);
		});

		return true;
	}

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	toString() {
		return `${Object.keys(this.wordIndices)}-${Object.values(this.wordIndices)}-${this.guesses.join(' ')}-${Object.values(this.hints).join(' ')}`;
	}
}
