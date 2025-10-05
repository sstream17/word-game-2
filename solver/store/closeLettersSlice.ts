import { WORD_LENGTH } from "@/constants/game";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICorrectLettersState } from "./types";
import { RootSolverState } from "./solverStore";

const initialState: ICorrectLettersState = {
  letters: "",
  currentIndex: 0,
  focused: false,
};

export const closeLettersSlice = createSlice({
  name: "closeLetters",
  initialState,
  reducers: {
    setFocused: (
      state,
      action: PayloadAction<{ isFocused: boolean; index: number }>,
    ) => {
      const { isFocused, index } = action.payload;
      state.focused = isFocused;
      if (index < 0 || index >= WORD_LENGTH) {
        state.currentIndex = 0;
      } else {
        state.currentIndex = index;
      }
    },
    updateLetters: (state, action: PayloadAction<string>) => {
      const previousValue = state.letters;
      if (previousValue.length === WORD_LENGTH) {
        return;
      }

      const newValue = `${previousValue.substring(0, state.currentIndex)}${action.payload}${previousValue.substring(state.currentIndex + 1)}`;
      state.letters = newValue;
      state.currentIndex = Math.min(state.currentIndex + 1, WORD_LENGTH - 1);
    },
    deleteLetterFromGuess: (state) => {
      const previousValue = state.letters;

      state.letters = `${previousValue.substring(0, state.currentIndex)} ${previousValue.substring(state.currentIndex + 1)}`;
      state.currentIndex = Math.max(state.currentIndex - 1, 0);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  deleteLetterFromGuess: deleteLetterFromCloseLetters,
  setFocused: setCloseLettersFocused,
  updateLetters: updateCloseLetters,
} = closeLettersSlice.actions;

export const selectCloseLetters = (state: RootSolverState) =>
  state.closeLetters.letters;

export default closeLettersSlice.reducer;
