import { useWindowDimensions } from "react-native";

const keyWidthRatio = 99;
const keyHeightRatio = 135;
const defaultGap = 9;

export function useKeySizes() {
  const { width: screenWidth } = useWindowDimensions();

  const maxWidth = Math.min(screenWidth, 500);
  const scaleFactor = maxWidth / (11 * keyWidthRatio); // 10 keys + 0.5 gap on each side

  const keyWidth = keyWidthRatio * scaleFactor;
  const keyHeight = keyHeightRatio * scaleFactor;
  const keyGap = defaultGap * scaleFactor;

  const keyboardHeight = keyHeight * 3 + keyGap * 2 + 36;

  return { keyWidth, keyHeight, keyGap, keyboardHeight };
}
