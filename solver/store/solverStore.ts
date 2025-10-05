import { configureStore } from "@reduxjs/toolkit";
import correctLettersReducer from "./correctLettersSlice";
import closeLettersReducer from "./closeLettersSlice";
import bannedLettersReducer from "./bannedLettersSlice";

const store = configureStore({
  reducer: {
    correctLetters: correctLettersReducer,
    closeLetters: closeLettersReducer,
    bannedLetters: bannedLettersReducer,
  },
});

export default store;

// Infer the `RootSolverState` and `SolverDispatch` types from the store itself
export type RootSolverState = ReturnType<typeof store.getState>;
export type SolverDispatch = typeof store.dispatch;
