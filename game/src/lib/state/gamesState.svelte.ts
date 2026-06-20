import { getResult } from '$lib/api';
import { sampleSize } from '$lib/api/lodash';
import {
    NUMBER_TRIES,
    VALID_KEYS,
    WORD_LENGTH,
    type GameStatus,
    type IGame,
    type IGamesState,
    type IHints
} from '$lib/types';
import { allowed, words } from './words';

const STORAGE_KEYS: (keyof IGamesState)[] = [
    'numberOfGames',
    'currentGuess',
    'guessIndex',
    'isGuessInvalid',
    'value',
    'hints',
    'status',
];

export class GamesState implements IGamesState {
    numberOfGames = $state(-1) as number;
    currentGuess = $state('');
    guessIndex = $state(-1);
    isGuessInvalid = $state(false);
    value = $state({}) as { [gameId: string]: IGame };
    hints = $state({}) as { [gameId: string]: IHints };
    status = $state('notStarted') as GameStatus;

    /**
     * Create a game object from storage, or initialize a new game
     */
    constructor(games: () => IGamesState) {
        const game = games ? games() : undefined;
        if (game && game.status !== 'notStarted') {
            Object.assign(this, game);
        } else {
            this.startGame(game?.numberOfGames ?? 1);
        }
    }

    /**
     * Serialize the class as a shape that can be stored
     * @returns The `IGamesState` representation of the class
     */
    toStorage(): IGamesState {
        return Object.fromEntries(
            STORAGE_KEYS.map(key => [key, this[key]])
        ) as unknown as IGamesState;
    }

    startGame(numberOfGames: number) {
        this.numberOfGames = numberOfGames;

        const answers = sampleSize(words, numberOfGames);

        this.numberOfGames = numberOfGames;
        this.value = {};
        this.hints = {};
        this.isGuessInvalid = false;

        const initialHints = Object.keys(VALID_KEYS).reduce((acc, key) => {
            acc[key] = 'unknown';
            return acc;
        }, {} as IHints);

        for (let i = 0; i < numberOfGames; i++) {
            this.value[`${i}`] = {
                answer: answers[i],
                guesses: [],
                activeIndex: 0,
                winIndex: undefined,
                status: 'inProgress'
            };

            this.hints[`${i}`] = {
                ...initialHints
            };
        }

        this.currentGuess = '';
        this.guessIndex = 0;
        this.status = 'inProgress';
    }

    /**
     * Validate whether the current guess is in the list of allowed words
     * @returns True if the guess was valid, false otherwise
     */
    validate(word: string) {
        return allowed.has(word);
    }

    /**
     * Update game state based on a new letter being added to the current guess
     * @param nextLetter The next letter to be added to the current guess
     */
    updateGuess(nextLetter: string) {
        const previousValue = this.currentGuess;
        if (previousValue.length === WORD_LENGTH) {
            return;
        }

        if (this.isGuessInvalid) {
            this.isGuessInvalid = false;
        }

        this.currentGuess = `${previousValue}${nextLetter}`;

        if (this.currentGuess.length === WORD_LENGTH) {
            this.isGuessInvalid = !this.validate(this.currentGuess);
        }
    }

    /**
     * Update game state by removing the last letter from the current guess
     */
    deleteLetterFromGuess() {
        const previousValue = this.currentGuess;
        if (previousValue.length < 1) {
            return;
        }

        if (this.isGuessInvalid) {
            this.isGuessInvalid = false;
        }

        this.currentGuess = `${previousValue.slice(0, -1)}`;
    }

    /**
     * Update game state based on a guess of a five-letter word
     * @return True if the guess was valid and processed, false otherwise
     */
    submitGuess(): boolean {
        const submittedGuess = this.currentGuess;

        if (submittedGuess.length !== WORD_LENGTH || this.isGuessInvalid) {
            return false;
        }

        let winCount = 0;

        const gameFinishedHints = Object.keys(VALID_KEYS).reduce((acc, key) => {
            acc[key] = 'missing';
            return acc;
        }, {} as IHints);

        Object.keys(this.value).forEach((gameIndex) => {
            if (this.value[gameIndex].status === 'won') {
                winCount = winCount + 1;
                return;
            }

            const answer = this.value[gameIndex].answer;
            const [result, newHints] = getResult(answer, submittedGuess, this.hints[gameIndex]);

            this.value[gameIndex].guesses.push({
                guess: submittedGuess,
                result
            });

            if (result === 'xxxxx') {
                this.value[gameIndex].status = 'won';
                this.value[gameIndex].winIndex = this.value[gameIndex].activeIndex;
                winCount = winCount + 1;

                const previousGuesses = this.value[gameIndex].guesses;
                this.value[gameIndex].guesses = [
                    ...previousGuesses,
                    ...Array.from(
                        {
                            length: this.numberOfGames + NUMBER_TRIES - previousGuesses.length
                        },
                        () => ({ guess: '', result: '_____' })
                    )
                ];

                // If the game is won, clear out all hints so they can be ignored.
                // It isn't valuable to know the status of a letter if the board can't be played.
                this.hints[gameIndex] = {
                    ...gameFinishedHints
                };
            } else {
                this.hints[gameIndex] = newHints;
                const activeIndex = this.value[gameIndex].activeIndex + 1;
                this.value[gameIndex].activeIndex = activeIndex;

                if (activeIndex >= this.numberOfGames + NUMBER_TRIES) {
                    this.value[gameIndex].winIndex = -1;
                }
            }
        });

        this.currentGuess = '';
        this.guessIndex += 1;

        const allWon = winCount === this.numberOfGames;

        if (allWon) {
            this.status = 'won';
        } else if (this.guessIndex >= this.numberOfGames + NUMBER_TRIES) {
            this.status = 'lost';
        }

        return true;
    }

    /**
     * Get the win indexes for all games
     * @returns An object containing the win index for each game, keyed by the game number (0 to n)
     */
    getWinIndexes(): { [gameId: string]: number | undefined } {
        return Object.keys(this.value).reduce(
            (acc, gameIndex) => {
                acc[gameIndex] = this.value[gameIndex].winIndex;
                return acc;
            },
            {} as { [gameId: string]: number | undefined }
        );
    }

    /**
     * Get the answers for all games
     * @returns An object containing the answers for each game, keyed by the game number (0 to n)
     */
    getAnswers(): { [gameId: string]: string } {
        return Object.keys(this.value).reduce(
            (acc, gameIndex) => {
                acc[gameIndex] = this.value[gameIndex].answer;
                return acc;
            },
            {} as { [gameId: string]: string }
        );
    }
}
