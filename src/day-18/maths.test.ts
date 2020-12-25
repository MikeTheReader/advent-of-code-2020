import { evaluateAdvanced, evaluateBasic } from './maths';

describe('maths', () => {
  describe('evaluateBasic', () => {
    it('works with the test examples', () => {
      expect(evaluateBasic('1 + 2 * 3 + 4 * 5 + 6')).toBe(71);
      expect(evaluateBasic('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51);
      expect(evaluateBasic('2 * 3 + (4 * 5) ')).toBe(26);
      expect(evaluateBasic('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(437);
      expect(evaluateBasic('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toBe(12240);
      expect(evaluateBasic('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toBe(13632);
    });
  });
  describe('evaluateAdvanced', () => {
    it('works with the test examples', () => {
      expect(evaluateAdvanced('1 + 2 * 3 + 4 * 5 + 6')).toBe(231);
      expect(evaluateAdvanced('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51);
      expect(evaluateAdvanced('2 * 3 + (4 * 5) ')).toBe(46);
      expect(evaluateAdvanced('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(1445);
      expect(evaluateAdvanced('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toBe(669060);
      expect(evaluateAdvanced('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toBe(23340);
    });
  });
});
