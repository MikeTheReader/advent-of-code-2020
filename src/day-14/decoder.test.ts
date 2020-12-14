import { applyBitmask, memoryDecoder } from './decoder';

describe('decoder', () => {
  describe('applyBitmask', () => {
    it('works with the given test data', () => {
      const commands = ['mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 'mem[8] = 11', 'mem[7] = 101', 'mem[8] = 0'];
      expect(applyBitmask(commands)).toBe(165);
    });
  });
  describe('memoryDecoder', () => {
    it('works with the given test data', () => {
      const commands = [
        'mask = 000000000000000000000000000000X1001X',
        'mem[42] = 100',
        'mask = 00000000000000000000000000000000X0XX',
        'mem[26] = 1'
      ];
      expect(memoryDecoder(commands)).toBe(208);
    });
  });
});
