import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameStore";
import { sampleSize } from "@/api";
import { words } from "@/constants/words";

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
  value: { [gameId: string]: IGame };
}

const initialState: IGamesState = {
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
    submitGuess: (state, action: PayloadAction<string>) => {
      Object.keys(state.value).forEach((gameIndex) => {
        state.value[gameIndex].guesses.push({
          guess: action.payload,
          result: "mmxcc",
        });
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { submitGuess, startGame } = gamesSlice.actions;

export const selectGuess = (state: RootGameState) => state.guess.value;

export default gamesSlice.reducer;
