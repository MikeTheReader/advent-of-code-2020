import { findFields, scanTickets } from './ticket';

describe('ticket', () => {
  describe('scanTickets', () => {
    it('works for the sample test data', () => {
      const rules = ['class: 1-3 or 5-7', 'row: 6-11 or 33-44', 'seat: 13-40 or 45-50'];
      const nearbyTickets = [
        [7, 3, 47],
        [40, 4, 50],
        [55, 2, 20],
        [38, 6, 12]
      ];
      expect(scanTickets(rules, nearbyTickets)).toBe(71);
    });
  });
  describe('findFields', () => {
    const rules = ['class: 0-1 or 4-19', 'row: 0-5 or 8-19', 'seat: 0-13 or 16-19'];
    const yourTicket = [11, 12, 13];
    const nearbyTickets = [
      [3, 9, 18],
      [15, 1, 5],
      [5, 14, 9]
    ];
    it('works for the same test data', () => {
      expect(findFields(rules, yourTicket, nearbyTickets)).toEqual({
        class: 12,
        row: 11,
        seat: 13
      });
    });
  });
});
