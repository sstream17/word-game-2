import { IHints } from "@/types/game";

/**
 * Given the current hints, a guess, and the result of comparing the guess to the answer, update the hints
 * @param hints The current hints for a single game
 * @param guess The guessed word
 * @param result The result of comparing the guess to the answer, in the form of "x" for exact matches, "c" for close matches, and "_" for no match
 * @returns Updated hints based on the guess and result
 */
export function updateHints(
  hints: IHints,
  guess: string,
  result: string,
): IHints {
  const newHints = { ...hints };

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];

    if (newHints[letter] === "missing") {
      continue;
    }

    const hintValue =
      result[i] === "x" ? "exact" : result[i] === "c" ? "close" : "missing";

    if (newHints[letter] === "close" && hintValue !== "exact") {
      continue;
    }

    newHints[letter] = hintValue;
  }

  return newHints;
}
