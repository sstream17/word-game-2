import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;

// Infer the `RootGameState` and `GameDispatch` types from the store itself
export type RootGameState = ReturnType<typeof store.getState>;
export type GameDispatch = typeof store.dispatch;
