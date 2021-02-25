import Grid from '../utils/grid';
import { findMatches, firstHalfAnswer, piecesMatch } from './puzzle';

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

const tile1427 = [
  '###.##.#..'.split(''),
  '.#..#.##..'.split(''),
  '.#.##.#..#'.split(''),
  '#.#.#.##.#'.split(''),
  '....#...##'.split(''),
  '...##..##.'.split(''),
  '...#.#####'.split(''),
  '.#.####.#.'.split(''),
  '..#..###.#'.split(''),
  '..##.#..#.'.split('')
];
const grid1427 = new Grid<string>();
grid1427.setGridArrays(tile1427);

const tile1489 = [
  '##.#.#....'.split(''),
  '..##...#..'.split(''),
  '.##..##...'.split(''),
  '..#...#...'.split(''),
  '#####...#.'.split(''),
  '#..#.#.#.#'.split(''),
  '...#.#.#..'.split(''),
  '##.#...##.'.split(''),
  '..##.##.##'.split(''),
  '###.##.#..'.split('')
];
const grid1489 = new Grid<string>();
grid1489.setGridArrays(tile1489);

const tile2473 = [
  '#....####.'.split(''),
  '#..#.##...'.split(''),
  '#.##..#...'.split(''),
  '######.#.#'.split(''),
  '.#...#.#.#'.split(''),
  '.#########'.split(''),
  '.###.#..#.'.split(''),
  '########.#'.split(''),
  '##...##.#.'.split(''),
  '..###.#.#.'.split('')
];
const grid2473 = new Grid<string>();
grid2473.setGridArrays(tile2473);

const tile2971 = [
  '..#.#....#'.split(''),
  '#...###...'.split(''),
  '#.#.###...'.split(''),
  '##.##..#..'.split(''),
  '.#####..##'.split(''),
  '.#..####.#'.split(''),
  '#..#.#..#.'.split(''),
  '..####.###'.split(''),
  '..#.#.###.'.split(''),
  '...#.#.#.#'.split('')
];
const grid2971 = new Grid<string>();
grid2971.setGridArrays(tile2971);

const tile2729 = [
  '...#.#.#.#'.split(''),
  '####.#....'.split(''),
  '..#.#.....'.split(''),
  '....#..#.#'.split(''),
  '.##..##.#.'.split(''),
  '.#.####...'.split(''),
  '####.#.#..'.split(''),
  '##.####...'.split(''),
  '##..#.##..'.split(''),
  '#.##...##.'.split('')
];
const grid2729 = new Grid<string>();
grid2729.setGridArrays(tile2729);

const tile3079 = [
  '#.#.#####.'.split(''),
  '.#..######'.split(''),
  '..#.......'.split(''),
  '######....'.split(''),
  '####.#..#.'.split(''),
  '.#...#.##.'.split(''),
  '#.#####.##'.split(''),
  '..#.###...'.split(''),
  '..#.......'.split(''),
  '..#.###...'.split('')
];
const grid3079 = new Grid<string>();
grid3079.setGridArrays(tile3079);

const allGrids = [
  { id: 2311, grid: grid2311 },
  { id: 1951, grid: grid1951 },
  { id: 1171, grid: grid1171 },
  { id: 1427, grid: grid1427 },
  { id: 1489, grid: grid1489 },
  { id: 2473, grid: grid2473 },
  { id: 2971, grid: grid2971 },
  { id: 2729, grid: grid2729 },
  { id: 3079, grid: grid3079 }
];

describe('day 20', () => {
  describe('piecesMatch', () => {
    it('returns true for matching pieces', () => {
      expect(piecesMatch(grid1951, grid2311)).toBe(true);
    });

    it('returns false for non-matching pieces', () => {
      expect(piecesMatch(grid1951, grid1171)).toBe(false);
    });
  });
  describe('findMatches', () => {
    it('finds all the matches in group', () => {
      const allMatches = findMatches(allGrids);
      expect(allMatches[2311].length).toEqual(3);
      expect(allMatches[1951].length).toEqual(2);
      expect(allMatches[1427].length).toEqual(4);
    });
  });
  describe('firstHalfAnswer', () => {
    it('returns the correct number', () => {
      expect(firstHalfAnswer(allGrids)).toEqual(20899048083289);
    });
  });
});
