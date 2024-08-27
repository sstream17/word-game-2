import { getResult, sampleSize } from "@/api";
import { NUMBER_OF_TRIES, WORD_LENGTH } from "@/constants/game";
import { words } from "@/constants/words";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameStore";
import { IGamesState } from "./types";

const initialState: IGamesState = {
  numberOfGames: 0,
  currentGuess: "",
  guessIndex: 0,
  value: {},
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<number>) => {
      const numberOfGames = action.payload;
      const answers = sampleSize(words, numberOfGames);

      state.numberOfGames = numberOfGames;

      for (let i = 0; i < numberOfGames; i++) {
        state.value[`${i}`] = {
          answer: answers[i],
          guesses: [],
          status: "inProgress",
        };
      }

      state.currentGuess = "";
      state.guessIndex = 0;
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
        if (state.value[gameIndex].status === "won") {
          return;
        }

        const answer = state.value[gameIndex].answer;
        const result = getResult(answer, submittedGuess);

        state.value[gameIndex].guesses.push({
          guess: submittedGuess,
          result,
        });

        if (result === "xxxxx") {
          state.value[gameIndex].status = "won";

          const previousGuesses = state.value[gameIndex].guesses;
          state.value[gameIndex].guesses = [
            ...previousGuesses,
            ...Array.from(
              {
                length:
                  state.numberOfGames +
                  NUMBER_OF_TRIES -
                  previousGuesses.length,
              },
              () => ({ guess: "", result: "_____" }),
            ),
          ];
        }
      });

      state.currentGuess = "";
      state.guessIndex += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteLetterFromGuess, startGame, submitGuess, updateGuess } =
  gamesSlice.actions;

export const selectCurrentGuess = (state: RootGameState) =>
  state.games.currentGuess;

export const selectGuessIndex = (state: RootGameState) =>
  state.games.guessIndex;

export const selectGameGuesses = (state: RootGameState, gameIndex: number) =>
  state.games.value[gameIndex]?.guesses ?? [];

export const selectGameStatus = (state: RootGameState, gameIndex: number) =>
  state.games.value[gameIndex]?.status ?? "inProgress";

export default gamesSlice.reducer;
