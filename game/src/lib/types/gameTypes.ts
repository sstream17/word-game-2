export type HintValues = 'x' | 'c' | '_';
export type HintString = `${HintValues}${HintValues}${HintValues}${HintValues}${HintValues}`;

export interface IGameData {
	numberOfGames: number;
	guesses: string[];
	hints: { [index: string]: HintString[] };
	answers: { [index: string]: string | null };
}

export const WORD_LENGTH = 5;
export const NUMBER_TRIES = 5;