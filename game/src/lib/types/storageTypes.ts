import type { IGamesState, IStatsState } from './gameTypes';
import type { Theme } from './themeTypes';

export const STORAGE_KEY = 'word-game';

/**
 * The persisted state of the game.
 *
 * `games` differs from `RootGameState["games"]` by mapping `numberOfGames` to `IGamesState`.
 * This allows for tracking the progress of all games, while keeping the transient state a flat structure
 * of a single game.
 */
export interface IStoredGameState {
	games: { [numberOfGames: number]: IGamesState };
	stats: IStatsState;
	theme: Theme;
}
