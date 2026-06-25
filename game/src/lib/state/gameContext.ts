import { createContext } from 'svelte';
import type { GamesState } from '../state/gamesState.svelte';

export const [getGameContext, setGameContext] = createContext<GamesState>();