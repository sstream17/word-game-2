import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameState";

interface IGuessState {
  value: string;
}

const initialState: IGuessState = {
  value: "",
};

export const guessSlice = createSlice({
  name: "guess",
  initialState,
  reducers: {
    updateGuess: (state, action: PayloadAction<string>) => {
      const previousValue = state.value;
      if (previousValue.length === 5) {
        return;
      }

      state.value = `${previousValue}${action.payload}`;
    },
    deleteLetterFromGuess: (state) => {
      const previousValue = state.value;
      if (previousValue.length < 1) {
        return;
      }

      state.value = `${previousValue.slice(0, -1)}`;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGuess, deleteLetterFromGuess } = guessSlice.actions;

export const selectGuess = (state: RootGameState) => state.guess.value;

export default guessSlice.reducer;
