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
  value: { [gameId: string]: IGame };
}
