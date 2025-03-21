import { getFinishIndex } from "../getFinishIndex";

describe("getFinishIndex", () => {
  describe("when numberOfGames is 1", () => {
    describe("when the user won in the least number of tries", () => {
      it("returns 0", () => {
        const winIndexes = {
          1: 0,
        };

        const result = getFinishIndex(1, winIndexes, true);
        expect(result).toEqual(0);
      });
    });
    describe("when the user won", () => {
      it("returns the correct index", () => {
        const winIndexes = {
          1: 3,
        };

        const result = getFinishIndex(1, winIndexes, true);
        expect(result).toEqual(3);
      });
    });
    describe("when the user lost", () => {
      it("returns the max index", () => {
        const winIndexes = {
          1: -1,
        };

        const result = getFinishIndex(1, winIndexes, false);
        expect(result).toEqual(6);
      });
    });
  });
  describe("when numberOfGames is 2", () => {
    describe("when the user won in the least number of tries", () => {
      it("returns 0", () => {
        const winIndexes = {
          1: 0,
          2: 1,
        };

        const result = getFinishIndex(2, winIndexes, true);
        expect(result).toEqual(0);
      });
    });
    describe("when the user won", () => {
      it("returns the correct index", () => {
        const winIndexes = {
          1: 4,
          2: 3,
        };

        const result = getFinishIndex(2, winIndexes, true);
        expect(result).toEqual(3);
      });
    });
    describe("when the user lost", () => {
      it("returns the max index", () => {
        const winIndexes = {
          1: -1,
          2: 4,
        };

        const result = getFinishIndex(2, winIndexes, false);
        expect(result).toEqual(6);
      });
    });
  });
  describe("when numberOfGames is 4", () => {
    describe("when the user won in the least number of tries", () => {
      it("returns 0", () => {
        const winIndexes = {
          1: 0,
          2: 1,
          3: 2,
          4: 3,
        };

        const result = getFinishIndex(4, winIndexes, true);
        expect(result).toEqual(0);
      });
    });
    describe("when the user won", () => {
      it("returns the correct index", () => {
        const winIndexes = {
          1: 4,
          2: 3,
          3: 5,
          4: 6,
        };

        const result = getFinishIndex(4, winIndexes, true);
        expect(result).toEqual(3);
      });
    });
    describe("when the user lost", () => {
      it("returns the max index", () => {
        const winIndexes = {
          1: -1,
          2: 4,
          3: 5,
          4: 6,
        };

        const result = getFinishIndex(4, winIndexes, false);
        expect(result).toEqual(6);
      });
    });
  });
});
