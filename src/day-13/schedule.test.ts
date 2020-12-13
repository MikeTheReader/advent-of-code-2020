import { findBus } from './schedule';

describe('schedule', () => {
  describe('findBus', () => {
    it('works for test data', () => {
      939;
      const busses = '7,13,x,x,59,x,31,19';
      expect(findBus(939, busses)).toBe(295);
    });
  });
});
