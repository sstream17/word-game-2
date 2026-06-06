export const WORD_LENGTH = 5;
export const NUMBER_TRIES = 5;

export type HintValues = 'x' | 'c' | '_';
export type HintString = `${HintValues}${HintValues}${HintValues}${HintValues}${HintValues}`;

export type GameStatus = 'notStarted' | 'inProgress' | 'won' | 'lost';
export type KeyStatus = 'unknown' | 'missing' | 'close' | 'exact';

export interface IHints {
	[key: string]: KeyStatus;
}

export interface IGuess {
	guess: string;
	result: string;
}

export interface IGame {
	answer: string;
	guesses: IGuess[];
	activeIndex: number;
	winIndex: number | undefined;
	status: 'inProgress' | 'won';
}

export interface IGamesState {
	numberOfGames: number;
	currentGuess: string;
	guessIndex: number;
	isGuessInvalid: boolean;
	value: { [gameId: string]: IGame };
	hints: { [gameId: string]: IHints };
	status: GameStatus;
}

export const initialGamesState: IGamesState = {
	numberOfGames: 1,
	currentGuess: '',
	guessIndex: 0,
	isGuessInvalid: false,
	value: {},
	hints: {},
	status: 'notStarted'
};

export interface IStats {
	gamesPlayed: number;
	gamesWon: number;
	currentWinStreak: number;
	maxWinStreak: number;
	/**
	 * Sum of the number of guesses it took to win each game.
	 */
	sumOfFinishes: number;
	/**
	 * Tracks games finished between indices 0-6.
	 *
     * @remarks
     * 
	 * Index 0 counts the number of games won in the fewest possible guesses.
     * Index 5 counts the number of games won in the most possible guesses.
	 * Index 6 counts the number of games lost.
	 */
	finishCounts: Record<number, number>;
}

export interface IStatsState {
	value: { [numberOfGames: number]: IStats };
}

/**
 * Legacy shape of game data.
 */
export interface IGameData {
	numberOfGames: number;
	guesses: string[];
	hints: { [index: string]: HintString[] };
	answers: { [index: string]: string | null };
}

/**
 * Legacy shape of stats data.
 */
export type GameStats = {
	[winIndex: number]: number;
	wins: number;
	maxWins: number;
	played: number;
	streak: number;
	maxStreak: number;
};
