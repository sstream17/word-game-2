import { WORD_LENGTH } from "@/constants/game";
import { IHints } from "@/types/game";

export function getResult(
  answer: string,
  guess: string,
  keyHints: IHints,
): [string, IHints] {
  const available = Array.from(answer);
  const hint = Array(WORD_LENGTH).fill("_");
  const newHints = { ...keyHints };

  // initialize newHints with all guessed letters missing
  // if they are not already marked as exact
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (newHints[guess[i]] !== "exact") {
      newHints[guess[i]] = "missing";
    }
  }

  // first, find exact matches
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (guess[i] === available[i]) {
      hint[i] = "x";
      available[i] = " ";
      newHints[guess[i]] = "exact";
    }
  }

  // then find close matches (this has to happen in a second step,
  // otherwise an early close match can prevent a later exact match)
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (hint[i] === "_") {
      const index = available.indexOf(guess[i]);
      if (index !== -1) {
        hint[i] = "c";
        available[index] = " ";
        if (newHints[guess[i]] !== "exact") {
          newHints[guess[i]] = "close";
        }
      }
    }
  }

  return [hint.join(""), newHints];
}
