import { useDispatch, useSelector } from "react-redux";
import type { GameDispatch, RootGameState } from "./gameStore";

// Typed versions of plain `useDispatch` and `useSelector`
export const useGameDispatch = useDispatch.withTypes<GameDispatch>();
export const useGameSelector = useSelector.withTypes<RootGameState>();
