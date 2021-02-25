import Grid from '../utils/grid';

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
