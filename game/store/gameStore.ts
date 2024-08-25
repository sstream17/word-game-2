import { configureStore } from "@reduxjs/toolkit";
import guessReducer from "./guessSlice";

const store = configureStore({
  reducer: {
    guess: guessReducer,
  },
});

export default store;

// Infer the `RootGameState` and `GameDispatch` types from the store itself
export type RootGameState = ReturnType<typeof store.getState>;
export type GameDispatch = typeof store.dispatch;
