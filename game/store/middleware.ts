import { createListenerMiddleware } from "@reduxjs/toolkit";
import { submitGuess, selectWinIndexes } from "./gamesSlice";
import { RootGameState, GameDispatch } from "./gameStore";
import { updateStats } from "./statsSlice";

export const listenerMiddleware = createListenerMiddleware();

const startAppListening = listenerMiddleware.startListening.withTypes<
  RootGameState,
  GameDispatch
>();

startAppListening({
  actionCreator: submitGuess,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState();

    const { numberOfGames, status } = state.games;

    if (status === "inProgress") {
      return;
    }

    const winIndexes = selectWinIndexes(state);

    listenerApi.dispatch(
      updateStats({
        numberOfGames: numberOfGames,
        won: status === "won",
        winIndexes,
      }),
    );
  },
});
