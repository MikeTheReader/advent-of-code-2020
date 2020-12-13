import { findBus, winContest } from './schedule';

describe('schedule', () => {
  describe('findBus', () => {
    it('works for test data', () => {
      939;
      const busses = '7,13,x,x,59,x,31,19';
      expect(findBus(939, busses)).toBe(295);
    });
  });
  describe('winContest', () => {
    it('works for test data', () => {
      const busses = '7,13,x,x,59,x,31,19';
      expect(winContest(busses)).toBe(1068781);

      const busses2 = '1789,37,47,1889';
      expect(winContest(busses2)).toBe(1202161486);

      const busses3 = '67,7,x,59,61';
      expect(winContest(busses3)).toBe(1261476);

      const busses4 = '67,x,7,59,61';
      expect(winContest(busses4)).toBe(779210);

      const busses5 = '17,x,13,19';
      expect(winContest(busses5)).toBe(3417);

      const busses6 = '67,7,59,61';
      expect(winContest(busses6)).toBe(754018);
    });
  });
});
