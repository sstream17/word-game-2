import gameStore from "./gameStore";

export * from "./gamesSlice";
export { useGameDispatch, useGameSelector } from "./hooks";
export * from "./statsSlice";
export default gameStore;
