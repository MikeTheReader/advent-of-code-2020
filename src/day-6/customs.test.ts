import { countAllYes, countYes } from './customs';

describe('customs', () => {
  describe('countYes', () => {
    it('works with the given data for part one', () => {
      expect(countYes(['abc'])).toBe(3);
      expect(countYes(['a', 'b', 'c'])).toBe(3);
      expect(countYes(['ab', 'ac'])).toBe(3);
      expect(countYes(['a', 'a', 'a', 'a'])).toBe(1);
      expect(countYes(['b'])).toBe(1);
    });
  });
  describe('countAllYes', () => {
    it('works with the given data for part two', () => {
      expect(countAllYes(['abc'])).toBe(3);
      expect(countAllYes(['a', 'b', 'c'])).toBe(0);
      expect(countAllYes(['ab', 'ac'])).toBe(1);
      expect(countAllYes(['a', 'a', 'a', 'a'])).toBe(1);
      expect(countAllYes(['b'])).toBe(1);
    });
  });
});
