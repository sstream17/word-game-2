import { getResult, sampleSize } from "@/api";
import { WORD_LENGTH } from "@/constants/game";
import { words } from "@/constants/words";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameStore";
import { IGamesState } from "./types";

const initialState: IGamesState = {
  currentGuess: "",
  value: {},
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<number>) => {
      const numberOfGames = action.payload;
      const answers = sampleSize(words, numberOfGames);

      for (let i = 0; i < numberOfGames; i++) {
        state.value[`${i}`] = {
          answer: answers[i],
          guesses: [],
          status: "inProgress",
        };
      }
    },
    updateGuess: (state, action: PayloadAction<string>) => {
      const previousValue = state.currentGuess;
      if (previousValue.length === WORD_LENGTH) {
        return;
      }

      state.currentGuess = `${previousValue}${action.payload}`;
    },
    deleteLetterFromGuess: (state) => {
      const previousValue = state.currentGuess;
      if (previousValue.length < 1) {
        return;
      }

      state.currentGuess = `${previousValue.slice(0, -1)}`;
    },
    submitGuess: (state) => {
      const submittedGuess = state.currentGuess;

      if (submittedGuess.length !== WORD_LENGTH) {
        return;
      }

      Object.keys(state.value).forEach((gameIndex) => {
        const answer = state.value[gameIndex].answer;
        const result = getResult(answer, submittedGuess);

        state.value[gameIndex].guesses.push({
          guess: submittedGuess,
          result,
        });
      });

      state.currentGuess = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteLetterFromGuess, startGame, submitGuess, updateGuess } =
  gamesSlice.actions;

export const selectGuess = (state: RootGameState) => state.games.currentGuess;

export default gamesSlice.reducer;
