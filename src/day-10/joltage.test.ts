import { findArrangementCount, findJumps } from './joltage';

describe('joltage', () => {
  const sampleData = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3
  ];
  describe('findJumps', () => {
    it('finds the correct jump counts for the sample data', () => {
      expect(findJumps(sampleData)).toEqual({
        one: 22,
        three: 10
      });
    });
  });
  describe('findArrangementCount', () => {
    it('finds the correct arrangement counts for the sample data', () => {
      expect(findArrangementCount(sampleData)).toBe(19208);
    });
    it('finds the expected number for the smaller sample data', () => {
      const smallerData = [1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19];
      expect(findArrangementCount(smallerData)).toBe(8);
    });
  });
});
