import { countYes } from './customs';

describe('customs', () => {
  it('works with the given data for part one', () => {
    expect(countYes(['abc'])).toBe(3);
    expect(countYes(['a', 'b', 'c'])).toBe(3);
    expect(countYes(['ab', 'ac'])).toBe(3);
    expect(countYes(['a', 'a', 'a', 'a'])).toBe(1);
    expect(countYes(['b'])).toBe(1);
  });
});
