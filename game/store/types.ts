import { GameStatus, IHints } from "@/types/game";

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
  status: GameStatus;
}

export const initialGamesState: IGamesState = {
  numberOfGames: 1,
  currentGuess: "",
  guessIndex: 0,
  isGuessInvalid: false,
  value: {},
  hints: {},
  status: "notStarted",
};

export interface IStats {
  gamesPlayed: number;
  gamesWon: number;
  currentWinStreak: number;
  maxWinStreak: number;
  // Sum of the number of guesses it took to win each game.
  sumOfFinishes: number;
  // Tracks games finished between indices 0-6.
  // Index 0 counts the number of games won in the fewest possible guesses.
  // Index 5 counts the number of games won in the most possible guesses.
  // Index 6 counts the number of games lost.
  finishCounts: Record<number, number>;
}

export interface IStatsState {
  value: { [numberOfGames: number]: IStats };
}

export interface IPersistenceState {
  hydratedGame: number | undefined;
  isStatsHydrated: boolean;
}

/**
 * The persisted state of the game.
 *
 * `games` differs from `RootGameState["games"]` by mapping `numberOfGames` to `IGamesState`.
 * This allows for tracking the progress of all games, while keeping the transient state a flat structure
 * of a single game.
 */
export interface IPersistedGameState {
  games: { [numberOfGames: number]: IGamesState };
  stats: IStatsState;
}
