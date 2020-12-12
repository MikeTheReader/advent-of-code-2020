import Grid from '../utils/grid';

export function countOccupiedSeats(startingPositions: string[]): number {
  return processSeats(startingPositions, checkCellSimple);
}

export function countOccupiedSeatsSightline(startingPositions: string[]): number {
  return processSeats(startingPositions, checkCellSightline);
}

function processSeats(startingPositions: string[], checkFunction) {
  const gridArrays = startingPositions.map(row => row.split(''));
  const seatGrid = new Grid<string>();
  seatGrid.setGridArrays(gridArrays);

  let occupiedSeats = 0;
  let lastStepsOccupiedSeats = -1;
  let currentGrid = Grid.fromGrid(seatGrid) as Grid<string>;

  while (occupiedSeats != lastStepsOccupiedSeats) {
    lastStepsOccupiedSeats = occupiedSeats;
    currentGrid = runStep(seatGrid, currentGrid, checkFunction);
    occupiedSeats = countOccupied(currentGrid);
  }

  return occupiedSeats;
}

function countOccupied(grid): number {
  let count = 0;
  grid.processCells(({ x, y }) => {
    const cellValue = grid.getValue({ x, y });
    if (cellValue === '#') {
      count++;
    }
  });
  return count;
}

export function runStep(seatGrid: Grid<string>, currentGrid: Grid<string>, checkFunction): Grid<string> {
  const afterStepGrid = Grid.fromGrid(currentGrid);
  afterStepGrid.processCells(({ x, y }) => {
    let newCellValue = currentGrid.getValue({ x, y });
    if (seatGrid.getValue({ x, y }) === 'L') {
      newCellValue = checkFunction(newCellValue === '#', currentGrid, x, y);
    }
    afterStepGrid.setValue({ x, y }, newCellValue);
  });
  return afterStepGrid as Grid<string>;
}

function checkCellSimple(isOccupied, grid, x, y) {
  const neighborCount = countNeighbors(grid, x, y);

  let returnValue = 'L';
  if (isOccupied) {
    if (neighborCount >= 4) {
      returnValue = 'L';
    } else {
      returnValue = '#';
    }
  } else {
    if (neighborCount === 0) {
      return '#';
    }
  }
  return returnValue;
}

function countNeighbors(grid, x, y) {
  const candidates = [
    [y - 1, x - 1],
    [y, x - 1],
    [y + 1, x - 1],
    [y - 1, x],
    [y + 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y + 1, x + 1]
  ];

  candidates.map(entry => grid.getValue({ x: entry[1], y: entry[0] }));
  const neighbors = candidates.filter(entry => grid.getValue({ x: entry[1], y: entry[0] }) === '#').length;
  return neighbors;
}

function checkCellSightline(isOccupied, grid, x, y) {
  const neighborCount = countNeighborsSightline(grid, x, y);

  let returnValue = 'L';
  if (isOccupied) {
    if (neighborCount >= 5) {
      returnValue = 'L';
    } else {
      returnValue = '#';
    }
  } else {
    if (neighborCount === 0) {
      return '#';
    }
  }
  return returnValue;
}

function countNeighborsSightline(grid, x, y) {
  const candidates = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
  ];

  return candidates.filter(entry => {
    let currentCell = { x: x + entry[0], y: y + entry[1] };
    let currentValue = grid.getValue(currentCell);
    let found = currentValue === '#';
    while (!found) {
      if (currentValue === 'L' || !currentValue) break;
      currentCell = { x: currentCell.x + entry[0], y: currentCell.y + entry[1] };
      currentValue = grid.getValue(currentCell);
      found = currentValue === '#';
    }
    return found;
  }).length;
}
