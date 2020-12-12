import { countOccupiedSeats, countOccupiedSeatsSightline } from './ferry';

describe('ferry', () => {
  describe('countOccupiedSeats', () => {
    it('returns the correct count for basic test data', () => {
      const data = ['LLL', 'LLL'];
      expect(countOccupiedSeats(data)).toBe(4);
    });
    it('returns the correct count for the test data', () => {
      const data = [
        'L.LL.LL.LL',
        'LLLLLLL.LL',
        'L.L.L..L..',
        'LLLL.LL.LL',
        'L.LL.LL.LL',
        'L.LLLLL.LL',
        '..L.L.....',
        'LLLLLLLLLL',
        'L.LLLLLL.L',
        'L.LLLLL.LL'
      ];
      expect(countOccupiedSeats(data)).toBe(37);
    });
  });
  describe('countOccupiedSeatsSightLine', () => {
    it('returns the correct count for basic test data', () => {
      const data = ['LLL', 'LLL'];
      expect(countOccupiedSeatsSightline(data)).toBe(4);
    });
    it('returns the correct count for the test data', () => {
      const data = [
        'L.LL.LL.LL',
        'LLLLLLL.LL',
        'L.L.L..L..',
        'LLLL.LL.LL',
        'L.LL.LL.LL',
        'L.LLLLL.LL',
        '..L.L.....',
        'LLLLLLLLLL',
        'L.LLLLLL.L',
        'L.LLLLL.LL'
      ];
      expect(countOccupiedSeatsSightline(data)).toBe(26);
    });
  });
});
