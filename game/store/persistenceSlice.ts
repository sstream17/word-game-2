import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersistenceState } from "./types";

const initialState: IPersistenceState = {
  hydratedGame: undefined,
};

export const persistenceSlice = createSlice({
  name: "persistence",
  initialState,
  reducers: {
    updateHydrationStatus: (state, action: PayloadAction<number>) => {
      const numberOfGames = action.payload;
      state.hydratedGame = numberOfGames;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateHydrationStatus } = persistenceSlice.actions;

export default persistenceSlice.reducer;
