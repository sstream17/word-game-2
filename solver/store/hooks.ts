import { useDispatch, useSelector } from "react-redux";
import { RootSolverState, SolverDispatch } from "./solverStore";

// Typed versions of plain `useDispatch` and `useSelector`
export const useSolverDispatch = useDispatch.withTypes<SolverDispatch>();
export const useSolverSelector = useSelector.withTypes<RootSolverState>();
