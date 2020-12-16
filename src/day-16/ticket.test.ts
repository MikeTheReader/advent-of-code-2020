import { scanTickets } from './ticket';

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
});
