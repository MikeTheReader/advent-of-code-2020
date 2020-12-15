import { playGame } from './game';

describe('game', () => {
  describe('playGame', () => {
    it('plays the game correctly with the test data', () => {
      expect(playGame(2020, [1, 3, 2])).toBe(1);
      expect(playGame(2020, [2, 1, 3])).toBe(10);
      expect(playGame(2020, [1, 2, 3])).toBe(27);
      expect(playGame(2020, [2, 3, 1])).toBe(78);
      expect(playGame(2020, [3, 2, 1])).toBe(438);
      expect(playGame(2020, [3, 1, 2])).toBe(1836);
    });
  });
});
