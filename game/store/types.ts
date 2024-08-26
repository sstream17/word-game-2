export interface IGuess {
  guess: string;
  result: string;
}

export interface IGame {
  answer: string;
  guesses: IGuess[];
  status: "inProgress" | "won";
}

export interface IGamesState {
  currentGuess: string;
  guessIndex: number;
  value: { [gameId: string]: IGame };
}
