import Grid from '../utils/grid';

export interface ITile {
  id: number;
  grid: Grid<string>;
}

export interface ITileMatches {
  [key: number]: ITile[];
}

export function firstHalfAnswer(tiles: ITile[]): number {
  const matches = findMatches(tiles);
  return Object.keys(matches)
    .filter(key => matches[key].length === 2)
    .map(key => +key)
    .reduce((total, key) => total * key);
}

export function findMatches(tiles: ITile[]): ITileMatches {
  const matches = {};
  tiles.forEach(tile => {
    matches[tile.id] = [];
  });
  tiles.forEach(currentTile => {
    tiles.forEach(targetTile => {
      if (targetTile.id !== currentTile.id) {
        const foundAMatch = piecesMatch(currentTile.grid, targetTile.grid);
        if (foundAMatch) {
          matches[currentTile.id].push(targetTile);
        }
      }
    });
  });
  return matches;
}

export function piecesMatch(gridOne: Grid<string>, gridTwo: Grid<string>): boolean {
  let matches = false;
  for (let r = 0; r < 2; r++) {
    gridOne.flipVertical();
    for (let i = 0; i < 4; i++) {
      gridOne.rotate();
      for (let j = 0; j < 4; j++) {
        gridTwo.rotate();
        if (arrayEquals(gridTwo.getGridArrays()[0], gridOne.getGridArrays()[gridOne.getGridArrays().length - 1])) {
          matches = true;
          break;
        }
      }
      if (matches) break;
    }
    if (matches) break;
  }

  return matches;
}

function arrayEquals(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}
