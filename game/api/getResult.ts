import { WORD_LENGTH } from "@/constants/game";

export function getResult(answer: string, guess: string): string {
  const available = Array.from(answer);
  const hint = Array(WORD_LENGTH).fill("_");

  // first, find exact matches
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (guess[i] === available[i]) {
      hint[i] = "x";
      available[i] = " ";
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
      }
    }
  }

  return hint.join("");
}
