import gameStore from "./gameStore";

export { deleteLetterFromGuess, selectGuess, updateGuess } from "./guessSlice";
export { useGameDispatch, useGameSelector } from "./hooks";
export default gameStore;
