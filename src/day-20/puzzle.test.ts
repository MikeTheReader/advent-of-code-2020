import Grid from '../utils/grid';
import { piecesMatch } from './puzzle';

describe('day 20', () => {
  describe('piecesMatch', () => {
    const tile1951 = [
      '#.##...##.'.split(''),
      '#.####...#'.split(''),
      '.....#..##'.split(''),
      '#...######'.split(''),
      '.##.#....#'.split(''),
      '.###.#####'.split(''),
      '###.##.##.'.split(''),
      '.###....#.'.split(''),
      '..#.#..#.#'.split(''),
      '#...##.#..'.split('')
    ];
    const grid1951 = new Grid<string>();
    grid1951.setGridArrays(tile1951);

    const tile2311 = [
      '..##.#..#.'.split(''),
      '##..#.....'.split(''),
      '#...##..#.'.split(''),
      '####.#...#'.split(''),
      '##.##.###.'.split(''),
      '##...#.###'.split(''),
      '.#.#.#..##'.split(''),
      '..#....#..'.split(''),
      '###...#.#.'.split(''),
      '..###..###'.split('')
    ];
    const grid2311 = new Grid<string>();
    grid2311.setGridArrays(tile2311);

    const tile1171 = [
      '####...##.'.split(''),
      '#..##.#..#'.split(''),
      '##.#..#.#.'.split(''),
      '.###.####.'.split(''),
      '..###.####'.split(''),
      '.##....##.'.split(''),
      '.#...####.'.split(''),
      '#.##.####.'.split(''),
      '####..#...'.split(''),
      '.....##...'.split('')
    ];
    const grid1171 = new Grid<string>();
    grid1171.setGridArrays(tile1171);

    it('returns true for matching pieces', () => {
      expect(piecesMatch(grid1951, grid2311)).toBe(true);
    });

    it('returns false for non-matching pieces', () => {
      expect(piecesMatch(grid1951, grid1171)).toBe(false);
    });
  });
});
