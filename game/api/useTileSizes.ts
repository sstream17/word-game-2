import { useWindowDimensions } from "react-native";

export function useTileSizes(numberOfColumns: 1 | 2 = 1) {
  const { width } = useWindowDimensions();

  const availableWidth = numberOfColumns === 1 ? width * 0.8 : width;

  const maxWidth = Math.min(availableWidth, 450);
  const tileWidth =
    (maxWidth - 6 * numberOfColumns * 8) / (5 * numberOfColumns);

  return { tileWidth, maxWidth };
}
