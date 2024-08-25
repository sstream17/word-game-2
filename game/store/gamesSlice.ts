import { sampleSize } from "@/api";
import { words } from "@/constants/words";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameStore";
import { WORD_LENGTH } from "@/constants/game";

function getResult(answer: string, guess: string): string {
  const available = Array.from(answer);
  const hint = Array(WORD_LENGTH).fill("_");

  // first, find exact matches
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (guess[i] === available[i]) {
      hint[i] = "x";
      available[i] = " ";
    }
  }

  // then find close matches (this has to happen in a second step,
  // otherwise an early close match can prevent a later exact match)
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (hint[i] === "_") {
      const index = available.indexOf(guess[i]);
      if (index !== -1) {
        hint[i] = "c";
        available[index] = " ";
      }
    }
  }

  return hint.join("");
}

interface IGuess {
  guess: string;
  result: string;
}

interface IGame {
  answer: string;
  guesses: IGuess[];
  status: "inProgress" | "won";
}

interface IGamesState {
  currentGuess: string;
  value: { [gameId: string]: IGame };
}

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
      if (previousValue.length === 5) {
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
      Object.keys(state.value).forEach((gameIndex) => {
        const answer = state.value[gameIndex].answer;
        const result = getResult(answer, submittedGuess);

        state.value[gameIndex].guesses.push({
          guess: submittedGuess,
          result,
        });
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteLetterFromGuess, startGame, submitGuess, updateGuess } =
  gamesSlice.actions;

export const selectGuess = (state: RootGameState) => state.games.currentGuess;

export default gamesSlice.reducer;
