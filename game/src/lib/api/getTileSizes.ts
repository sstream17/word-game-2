import { WORD_LENGTH, TILE_GAP } from "$lib/types";

/**
 * Get the tile sizes for this game based on the current screen size
 * @param numberOfGames The number of games currently being played
 * @param screenWidth The value of the screenWidth state bound to the window
 * @returns A object containing:
 * - The maxWidth of the available boards area
 * - The tileWidth for each tile in a board
 */
export const getTileSizes = (numberOfGames: number, screenWidth: number | null | undefined): {
    /**
    * The max width of the game boards area
    */
   maxWidth: number, 
   /**
    * The width of an individual tile in a game board
    */
   tileWidth: number
} => {
    const numberOfColumns = numberOfGames === 1 ? 1 : 2;
    const availableWidth = screenWidth == null ? screenWidth : numberOfColumns === 1 ? screenWidth * 0.8 : screenWidth;
    const maxWidth = Math.min(availableWidth ?? Infinity, 450);
    const tileWidth = (maxWidth - (WORD_LENGTH + 1) * numberOfColumns * TILE_GAP) / (WORD_LENGTH * numberOfColumns);

    return { maxWidth, tileWidth };
}