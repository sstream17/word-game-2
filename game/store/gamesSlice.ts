import { getResult, sampleSize, validateGuess } from "@/api";
import { NUMBER_OF_TRIES, VALID_KEYS, WORD_LENGTH } from "@/constants/game";
import { words } from "@/constants/words";
import { IHints } from "@/types/game";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameStore";
import { IGamesState } from "./types";

const initialState: IGamesState = {
  numberOfGames: 1,
  currentGuess: "",
  guessIndex: 0,
  isGuessInvalid: false,
  value: {},
  hints: {},
  status: "inProgress",
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<number | undefined>) => {
      const numberOfGames = action.payload ?? state.numberOfGames;
      const answers = sampleSize(words, numberOfGames);

      state.numberOfGames = numberOfGames;
      state.value = {};
      state.hints = {};
      state.isGuessInvalid = false;

      const initialHints = Object.keys(VALID_KEYS).reduce((acc, key) => {
        acc[key] = "unknown";
        return acc;
      }, {} as IHints);

      for (let i = 0; i < numberOfGames; i++) {
        state.value[`${i}`] = {
          answer: answers[i],
          guesses: [],
          status: "inProgress",
        };

        state.hints[`${i}`] = {
          ...initialHints,
        };
      }

      state.currentGuess = "";
      state.guessIndex = 0;
      state.status = "inProgress";
    },
    updateGuess: (state, action: PayloadAction<string>) => {
      const previousValue = state.currentGuess;
      if (previousValue.length === WORD_LENGTH) {
        return;
      }

      if (state.isGuessInvalid) {
        state.isGuessInvalid = false;
      }

      state.currentGuess = `${previousValue}${action.payload}`;

      if (state.currentGuess.length === WORD_LENGTH) {
        state.isGuessInvalid = !validateGuess(state.currentGuess);
      }
    },
    deleteLetterFromGuess: (state) => {
      const previousValue = state.currentGuess;
      if (previousValue.length < 1) {
        return;
      }

      if (state.isGuessInvalid) {
        state.isGuessInvalid = false;
      }

      state.currentGuess = `${previousValue.slice(0, -1)}`;
    },
    submitGuess: (state) => {
      const submittedGuess = state.currentGuess;

      if (submittedGuess.length !== WORD_LENGTH || state.isGuessInvalid) {
        return;
      }

      let winCount = 0;

      const gameFinishedHints = Object.keys(VALID_KEYS).reduce((acc, key) => {
        acc[key] = "missing";
        return acc;
      }, {} as IHints);

      Object.keys(state.value).forEach((gameIndex) => {
        if (state.value[gameIndex].status === "won") {
          winCount = winCount + 1;
          return;
        }

        const answer = state.value[gameIndex].answer;
        const [result, newHints] = getResult(
          answer,
          submittedGuess,
          state.hints[gameIndex],
        );

        state.value[gameIndex].guesses.push({
          guess: submittedGuess,
          result,
        });

        if (result === "xxxxx") {
          state.value[gameIndex].status = "won";
          winCount = winCount + 1;

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

          // If the game is won, clear out all hints so they can be ignored.
          // It isn't valuable to know the status of a letter if the board can't be played.
          state.hints[gameIndex] = {
            ...gameFinishedHints,
          };
        } else {
          state.hints[gameIndex] = newHints;
        }
      });

      state.currentGuess = "";
      state.guessIndex += 1;

      const allWon = winCount === state.numberOfGames;

      if (allWon) {
        state.status = "won";
      } else if (state.guessIndex >= state.numberOfGames + NUMBER_OF_TRIES) {
        state.status = "lost";
      }
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

export const selectIsGuessInvalid = (state: RootGameState) =>
  state.games.isGuessInvalid;

export const selectOverallStatus = (state: RootGameState) => state.games.status;

export const selectHints = (state: RootGameState) => state.games.hints;

export const selectGameGuesses = (state: RootGameState, gameIndex: number) =>
  state.games.value[gameIndex]?.guesses ?? [];

export const selectGameStatus = (state: RootGameState, gameIndex: number) =>
  state.games.value[gameIndex]?.status ?? "inProgress";

export default gamesSlice.reducer;
