import { parsePass } from './boarding';

describe('boarding', () => {
  it('handles part one samples correctly', () => {
    expect(parsePass('FBFBBFFRLR')).toEqual([44, 5]);
    expect(parsePass('BFFFBBFRRR')).toEqual([70, 7]);
    expect(parsePass('FFFBBBFRRR')).toEqual([14, 7]);
    expect(parsePass('BBFFBBFRLL')).toEqual([102, 4]);
  });
});
