import type { IGameData } from "$lib/types";

export function createGameState(initial: IGameData) {
    let game = $state(initial);
    return {
        get game() {
            return game;
        },
        set game(value) {
            game = value;
        },
    };
}