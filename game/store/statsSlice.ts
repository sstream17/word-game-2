import { getFinishIndex } from "@/api/getFinishIndex";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameStore";
import { IStats, IStatsState } from "./types";

interface IPayload {
  numberOfGames: number;
  won: boolean;
  winIndexes: { [gameId: string]: number | undefined };
}

const initialStats: IStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  sumOfFinishes: 0,
  currentWinStreak: 0,
  maxWinStreak: 0,
  finishCounts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
};

const initialState: IStatsState = {
  value: {
    1: { ...initialStats },
    2: { ...initialStats },
    4: { ...initialStats },
  },
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    updateStats: (state, action: PayloadAction<IPayload>) => {
      const { numberOfGames, won, winIndexes } = action.payload;

      const newStats = { ...state.value[numberOfGames] };

      newStats.gamesPlayed = newStats.gamesPlayed + 1;

      if (won) {
        newStats.gamesWon = newStats.gamesWon + 1;
        newStats.currentWinStreak = newStats.currentWinStreak + 1;
        newStats.maxWinStreak = Math.max(
          newStats.maxWinStreak,
          newStats.currentWinStreak,
        );
      } else {
        newStats.currentWinStreak = 0;
      }

      const finishIndex = getFinishIndex(numberOfGames, winIndexes, won);

      newStats.sumOfFinishes =
        newStats.sumOfFinishes + numberOfGames + finishIndex;

      newStats.finishCounts[finishIndex] =
        (newStats.finishCounts[finishIndex] ?? 0) + 1;

      state.value[numberOfGames] = newStats;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStats } = statsSlice.actions;

export const selectGameStats = (state: RootGameState, gameIndex: number) =>
  state.stats.value[gameIndex];

export default statsSlice.reducer;
