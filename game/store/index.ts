import gameStore from "./gameStore";

export {
  deleteLetterFromGuess,
  selectCurrentGuess,
  selectGameGuesses,
  selectGuessIndex,
  startGame,
  submitGuess,
  updateGuess,
} from "./gamesSlice";
export { useGameDispatch, useGameSelector } from "./hooks";
export default gameStore;
