import { evaluate } from './maths';

describe('maths', () => {
  describe('evaluate', () => {
    it('works with the test examples', () => {
      expect(evaluate('1 + 2 * 3 + 4 * 5 + 6')).toBe(71);
      expect(evaluate('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51);
      expect(evaluate('2 * 3 + (4 * 5) ')).toBe(26);
      expect(evaluate('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(437);
      expect(evaluate('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toBe(12240);
      expect(evaluate('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toBe(13632);
    });
  });
});
