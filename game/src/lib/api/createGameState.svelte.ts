import type { IGameData } from "$lib/types";

export function createGameState(getInitialData: () => IGameData) {
    let game = $state(getInitialData());
    return {
        get game() {
            return game;
        },
        set game(value) {
            game = value;
        },
    };
}