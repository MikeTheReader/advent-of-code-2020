import { applyBitmask } from './decoder';

describe('decoder', () => {
  describe('applyBitmask', () => {
    it('works with the given test data', () => {
      const commands = ['mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 'mem[8] = 11', 'mem[7] = 101', 'mem[8] = 0'];
      expect(applyBitmask(commands)).toBe(165);
    });
  });
});
