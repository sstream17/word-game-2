import { getData } from "@/persistence/getData";
import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import { listenerMiddleware } from "./middleware";
import persistenceReducer, {
  updateStatsHydrationStatus,
} from "./persistenceSlice";
import statsReducer, { hydrateStats } from "./statsSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
    stats: statsReducer,
    persistence: persistenceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export async function initialHydrate() {
  const state = store.getState();

  if (state.persistence.isStatsHydrated) {
    return;
  }

  const data = await getData();
  if (data?.stats) {
    store.dispatch(hydrateStats(data?.stats));
    store.dispatch(updateStatsHydrationStatus(true));
  }
}

export default store;

// Infer the `RootGameState` and `GameDispatch` types from the store itself
export type RootGameState = ReturnType<typeof store.getState>;
export type GameDispatch = typeof store.dispatch;
