import gameStore from "./gameStore";

export { startGame, submitGuess } from "./gamesSlice";
export { deleteLetterFromGuess, selectGuess, updateGuess } from "./guessSlice";
export { useGameDispatch, useGameSelector } from "./hooks";
export default gameStore;
