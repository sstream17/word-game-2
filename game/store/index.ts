import gameStore from "./gameStore";

export {
  deleteLetterFromGuess,
  selectGuess,
  startGame,
  submitGuess,
  updateGuess,
} from "./gamesSlice";
export { useGameDispatch, useGameSelector } from "./hooks";
export default gameStore;
