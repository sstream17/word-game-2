import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersistenceState } from "./types";

const initialState: IPersistenceState = {
  hydrated: {
    1: false,
    2: false,
    4: false,
  },
};

export const persistenceSlice = createSlice({
  name: "persistence",
  initialState,
  reducers: {
    trackHydration: (state, action: PayloadAction<number>) => {
      const numberOfGames = action.payload;
      state.hydrated[numberOfGames] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { trackHydration } = persistenceSlice.actions;

export default persistenceSlice.reducer;
