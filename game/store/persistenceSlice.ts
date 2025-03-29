import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootGameState } from "./gameStore";
import { IPersistenceState } from "./types";

const initialState: IPersistenceState = {
  hydratedGame: undefined,
  isStatsHydrated: false,
};

export const persistenceSlice = createSlice({
  name: "persistence",
  initialState,
  reducers: {
    updateGameHydrationStatus: (state, action: PayloadAction<number>) => {
      const numberOfGames = action.payload;
      state.hydratedGame = numberOfGames;
    },
    updateStatsHydrationStatus: (state, action: PayloadAction<boolean>) => {
      const isHydrated = action.payload;
      state.isStatsHydrated = isHydrated;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGameHydrationStatus, updateStatsHydrationStatus } =
  persistenceSlice.actions;

// Need to explicitly handle stats hydration since there is no starting reducer to listen to
export const selectIsStatsHydrated = (state: RootGameState) =>
  state.persistence.isStatsHydrated;

export default persistenceSlice.reducer;
