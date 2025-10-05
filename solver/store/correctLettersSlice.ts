import { WORD_LENGTH } from "@/constants/game";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootSolverState } from "./solverStore";
import { ICorrectLettersState } from "./types";

const initialState: ICorrectLettersState = {
  letters: "",
  currentIndex: 0,
  focused: false,
};

export const correctLettersSlice = createSlice({
  name: "correctLetters",
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
  deleteLetterFromGuess: deleteLetterFromCorrectLetters,
  setFocused: setCorrectLettersFocused,
  updateLetters: updateCorrectLetters,
} = correctLettersSlice.actions;

export const selectCorrectLetters = (state: RootSolverState) =>
  state.correctLetters.letters;

export default correctLettersSlice.reducer;
