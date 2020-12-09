import { findEncryptionWeakness, findInvalidNumber } from './port';

describe('port', () => {
  const testData = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];
  describe('findInvalidNumber', () => {
    it('works for the given test data', () => {
      expect(findInvalidNumber(5, testData)).toBe(127);
    });
  });
  describe('findEncryptionWeakness', () => {
    it('works with the given test data', () => {
      expect(findEncryptionWeakness(5, testData)).toBe(62);
    });
  });
});
