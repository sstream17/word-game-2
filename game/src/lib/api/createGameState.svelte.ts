import type { IGamesState } from '$lib/types';

export function createGameState(getInitialData: () => IGamesState) {
	let game = $state(getInitialData());
	return {
		get game() {
			return game;
		},
		set game(value) {
			game = value;
		}
	};
}
