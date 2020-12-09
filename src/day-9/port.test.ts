import { findInvalidNumber } from './port';

describe('port', () => {
  describe('findInvalidNumber', () => {
    it('works for the given test data', () => {
      const testData = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];
      expect(findInvalidNumber(5, testData)).toBe(127);
    });
  });
});
