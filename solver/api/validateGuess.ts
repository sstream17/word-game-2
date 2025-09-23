import { allowed } from "@/constants/words";

export function validateGuess(guess: string): boolean {
  return allowed.has(guess);
}
