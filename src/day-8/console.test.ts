import { findLoop, fixProgram } from './console';

describe('console', () => {
  describe('findLoop', () => {
    it('returns correct value for test data', () => {
      const commands = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'];
      expect(findLoop(commands).accumulator).toBe(5);
    });
  });
  describe('findTermination', () => {
    it('returns correct value for test data', () => {
      const commands = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'];
      expect(fixProgram(commands)).toBe(8);
    });
  });
});
