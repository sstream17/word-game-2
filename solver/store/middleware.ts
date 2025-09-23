import { getData } from "@/persistence/getData";
import { updateGameProgress } from "@/persistence/updateGameProgress";
import { updateGameStats } from "@/persistence/updateGameStats";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  hydrateGame,
  selectWinIndexes,
  startGame,
  submitGuess,
} from "./gamesSlice";
import { GameDispatch, RootGameState } from "./gameStore";
import { updateGameHydrationStatus } from "./persistenceSlice";
import { updateStats } from "./statsSlice";

export const listenerMiddleware = createListenerMiddleware();

const startAppListening = listenerMiddleware.startListening.withTypes<
  RootGameState,
  GameDispatch
>();

startAppListening({
  actionCreator: startGame,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState();

    const { numberOfGames } = state.games;

    if (state.persistence.hydratedGame === numberOfGames) {
      return;
    }

    const data = await getData();

    listenerApi.dispatch(updateGameHydrationStatus(numberOfGames));

    if (!data?.games || !data.games[numberOfGames]) {
      return;
    }

    const gameProgress = data.games[numberOfGames];
    listenerApi.dispatch(hydrateGame(gameProgress));
  },
});

startAppListening({
  actionCreator: submitGuess,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState();

    const { numberOfGames, status } = state.games;

    await updateGameProgress(state.games, numberOfGames);

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

startAppListening({
  actionCreator: updateStats,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState();

    const { numberOfGames } = state.games;

    const stats = state.stats.value[numberOfGames];

    await updateGameStats(stats, numberOfGames);
  },
});
