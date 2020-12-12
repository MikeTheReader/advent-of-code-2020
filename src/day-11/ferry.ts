import Grid, { Coordinate } from '../utils/grid';

export function countOccupiedSeats(startingPositions: string[]): number {
  return processSeats(startingPositions, checkCellSimple);
}

export function countOccupiedSeatsSightline(startingPositions: string[]): number {
  return processSeats(startingPositions, checkCellSightline);
}

function processSeats(
  startingPositions: string[],
  checkFunction: (isOccupied: boolean, grid: Grid<string>, coordinate: Coordinate) => string
) {
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
  grid.processCells((coordinate: Coordinate) => {
    const cellValue = grid.getValue(coordinate);
    if (cellValue === '#') {
      count++;
    }
  });
  return count;
}

export function runStep(
  seatGrid: Grid<string>,
  currentGrid: Grid<string>,
  checkFunction: (isOccupied: boolean, grid: Grid<string>, coordinate: Coordinate) => string
): Grid<string> {
  const afterStepGrid = Grid.fromGrid(currentGrid);
  afterStepGrid.processCells((coordinate: Coordinate) => {
    let newCellValue = currentGrid.getValue(coordinate);
    if (seatGrid.getValue(coordinate) === 'L') {
      newCellValue = checkFunction(newCellValue === '#', currentGrid, coordinate);
    }
    afterStepGrid.setValue(coordinate, newCellValue);
  });
  return afterStepGrid as Grid<string>;
}

function checkCellSimple(isOccupied: boolean, grid: Grid<string>, coordinate: Coordinate) {
  const neighborCount = countNeighbors(grid, coordinate);

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

function countNeighbors(grid, { x, y }: Coordinate) {
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

function checkCellSightline(isOccupied: boolean, grid: Grid<string>, coordinate: Coordinate) {
  const neighborCount = countNeighborsSightline(grid, coordinate);

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

function countNeighborsSightline(grid: Grid<string>, coordinate: Coordinate) {
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
    let currentCell = coordinate;
    let found = false;
    do {
      currentCell = { x: currentCell.x + entry[0], y: currentCell.y + entry[1] };
      const currentValue = grid.getValue(currentCell);
      if (currentValue === 'L' || !currentValue) break;
      found = currentValue === '#';
    } while (!found);
    return found;
  }).length;
}
