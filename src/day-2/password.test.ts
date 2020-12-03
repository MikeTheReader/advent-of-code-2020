import { checkPassword, checkPositionPassword } from './password';

describe('checkPassword', () => {
  it('works with provided test cases', () => {
    expect(checkPassword('1-3 a: abcde')).toBe(true);
    expect(checkPassword('1-3 b: cdefg')).toBe(false);
  });
});

describe('checkPositionPassword', () => {
  it('works with provided test cases', () => {
    expect(checkPositionPassword('1-3 a: abcde')).toBe(true);
    expect(checkPositionPassword('1-3 b: cdefg')).toBe(false);
  });
});
