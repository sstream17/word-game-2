import { STORAGE_KEY } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  hydrate,
  selectWinIndexes,
  startGame,
  submitGuess,
} from "./gamesSlice";
import { GameDispatch, RootGameState } from "./gameStore";
import { trackHydration } from "./persistenceSlice";
import { updateStats } from "./statsSlice";
import { IPersistedGameState } from "./types";

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

    const persistedData = {
      games: { [numberOfGames]: state.games },
    };

    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(persistedData));

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
  actionCreator: startGame,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState();

    const { numberOfGames } = state.games;

    if (state.persistence.hydrated[numberOfGames]) {
      return;
    }

    const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
    const data = (jsonData ? JSON.parse(jsonData) : {}) as IPersistedGameState;

    if (!data.games || !data.games[numberOfGames]) {
      return;
    }

    const gameProgress = data.games[numberOfGames];

    listenerApi.dispatch(hydrate(gameProgress));
    listenerApi.dispatch(trackHydration(numberOfGames));
  },
});
