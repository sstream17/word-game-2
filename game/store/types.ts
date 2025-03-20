import { IHints } from "@/types/game";

export interface IGuess {
  guess: string;
  result: string;
}

export interface IGame {
  answer: string;
  guesses: IGuess[];
  activeIndex: number;
  winIndex: number | undefined;
  status: "inProgress" | "won";
}

export interface IGamesState {
  numberOfGames: number;
  currentGuess: string;
  guessIndex: number;
  isGuessInvalid: boolean;
  value: { [gameId: string]: IGame };
  hints: { [gameId: string]: IHints };
  status: "inProgress" | "won" | "lost";
}
