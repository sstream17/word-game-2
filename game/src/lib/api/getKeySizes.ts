const keyWidthRatio = 99;
const keyHeightRatio = 135;
const defaultGap = 9;

export const getKeySizes = (screenWidth: number | null | undefined) => {
    const maxWidth = Math.min(screenWidth ? screenWidth : Infinity, 500);
    const scaleFactor = maxWidth / (11 * keyWidthRatio); // 10 keys + 0.5 gap on each side

    const keyWidth = keyWidthRatio * scaleFactor;
    const keyHeight = keyHeightRatio * scaleFactor;
    const keyGap = defaultGap * scaleFactor;

    const keyboardHeight = keyHeight * 3 + keyGap * 2 + 36;

    return { keyWidth, keyHeight, keyGap, keyboardHeight };
}