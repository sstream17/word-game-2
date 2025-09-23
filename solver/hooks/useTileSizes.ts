import { useWindowDimensions } from "react-native";

import { WORD_LENGTH } from "@/constants/game";
import { TILE_GAP } from "@/constants/layout";

export function useTileSizes(numberOfColumns: 1 | 2 = 1) {
  const { width } = useWindowDimensions();

  const availableWidth = numberOfColumns === 1 ? width * 0.8 : width;

  const maxWidth = Math.min(availableWidth, 450);
  const tileWidth =
    (maxWidth - (WORD_LENGTH + 1) * numberOfColumns * TILE_GAP) /
    (WORD_LENGTH * numberOfColumns);

  return { tileWidth, maxWidth };
}
