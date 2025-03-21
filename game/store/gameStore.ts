import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import { listenerMiddleware } from "./middleware";
import statsReducer from "./statsSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

// Infer the `RootGameState` and `GameDispatch` types from the store itself
export type RootGameState = ReturnType<typeof store.getState>;
export type GameDispatch = typeof store.dispatch;
