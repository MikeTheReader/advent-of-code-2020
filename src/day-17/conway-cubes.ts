import Grid, { Coordinate, Dimensions } from '../utils/grid';

interface I3DimensionalSpace {
  [key: number]: Grid<string>;
}

let variances: number[][];

export function countActiveCubes(startData: string[], numCycles = 2): number {
  variances = createVariances(3);
  let dimensionalSpace = parseStartData(startData, numCycles);
  for (let i = 0; i < numCycles; i++) {
    dimensionalSpace = tick(dimensionalSpace);
  }
  return Object.keys(dimensionalSpace).reduce((total, layer) => {
    return total + dimensionalSpace[layer].findInGrid('#').length;
  }, 0);
}

export function countFourDimensions(startData: string[], numCycles = 6): number {
  numCycles = 6;
  variances = createVariances(4);
  let fourDimensionalSpace = parseFourStartData(startData, numCycles);
  for (let i = 0; i < numCycles; i++) {
    fourDimensionalSpace = tickFour(fourDimensionalSpace);
  }
  let total = 0;
  fourDimensionalSpace.processCells(outerCoord => {
    total += fourDimensionalSpace.getValue(outerCoord).findInGrid('#').length;
  });
  return total;
}

function tick(originalSpace: I3DimensionalSpace): I3DimensionalSpace {
  const newSpace = copySpace(originalSpace);
  Object.keys(originalSpace).forEach(key => {
    originalSpace[key].processCells(coord => {
      const neighbors = getNeighbors(originalSpace, coord, +key);
      const active = originalSpace[key].getValue(coord) === '#';
      if (active) {
        if (neighbors !== 2 && neighbors !== 3) {
          newSpace[key].setValue(coord, '.');
        }
      } else {
        if (neighbors === 3) {
          newSpace[key].setValue(coord, '#');
        }
      }
    });
  });
  return newSpace;
}

function tickFour(originalSpace: Grid<Grid<string>>): Grid<Grid<string>> {
  const newSpace = copyFourSpace(originalSpace);
  originalSpace.processCells(outerCoord => {
    originalSpace.getValue(outerCoord).processCells(innerCoord => {
      const allCoords = [outerCoord, innerCoord];
      const neighbors = getNeighborsFour(originalSpace, allCoords);
      const active = originalSpace.getValue(outerCoord).getValue(innerCoord) === '#';
      if (active) {
        if (neighbors !== 2 && neighbors !== 3) {
          newSpace.getValue(outerCoord).setValue(innerCoord, '.');
        }
      } else {
        if (neighbors === 3) {
          newSpace.getValue(outerCoord).setValue(innerCoord, '#');
        }
      }
    });
  });
  return newSpace;
}

function getNeighbors(space: I3DimensionalSpace, coord: Coordinate, z: number) {
  return variances.reduce((total, variance) => {
    if (space[z + variance[0]]) {
      const value = space[z + variance[0]].getValue({ x: coord.x + variance[1], y: coord.y + variance[2] });
      if (value === '#') {
        total++;
      }
    }
    return total;
  }, 0);
}

function getNeighborsFour(space: Grid<Grid<string>>, coord: Coordinate[]) {
  return variances.reduce((total, variance) => {
    const outerGrid = space.getValue({ x: coord[0].x + variance[0], y: coord[0].y + variance[1] });
    if (outerGrid) {
      const value = outerGrid.getValue({ x: coord[1].x + variance[2], y: coord[1].y + variance[3] });
      if (value === '#') {
        total++;
      }
    }
    return total;
  }, 0);
}

function parseStartData(startData: string[], numCycles: number): I3DimensionalSpace {
  const startingHeight = startData.length;
  const startingWidth = startData[0].split('').length;
  const finishedDimensions: Dimensions = {
    height: numCycles * 2 + startingHeight,
    width: numCycles * 2 + startingWidth
  };
  const coordinateData: I3DimensionalSpace = {};
  coordinateData[0] = new Grid<string>();
  coordinateData[0].fill('.', finishedDimensions);
  for (let i = 1; i <= numCycles; i++) {
    coordinateData[i] = new Grid<string>();
    coordinateData[i].fill('.', finishedDimensions);
    coordinateData[i * -1] = new Grid<string>();
    coordinateData[i * -1].fill('.', finishedDimensions);
  }

  startData.forEach((row, rowIndex) => {
    row.split('').forEach((value, columnIndex) => {
      coordinateData[0].setValue({ x: columnIndex + numCycles, y: rowIndex + numCycles }, value);
    });
  });
  return coordinateData;
}

function parseFourStartData(startData: string[], numCycles: number): Grid<Grid<string>> {
  const startingHeight = startData.length;
  const startingWidth = startData[0].split('').length;
  const finishedInnerDimensions: Dimensions = {
    height: numCycles * 2 + startingHeight,
    width: numCycles * 2 + startingWidth
  };
  const containerGrid = new Grid<Grid<string>>();
  containerGrid.fill(new Grid<string>(), {
    height: Math.max(numCycles * 2 + 1, 1),
    width: Math.max(numCycles * 2 + 1, 1)
  });
  containerGrid.processCells(coord => {
    containerGrid.setValue(coord, new Grid<string>());
    containerGrid.getValue(coord).fill('.', finishedInnerDimensions);
  });

  const centerGrid = containerGrid.getValue({ x: numCycles, y: numCycles });

  startData.forEach((row, rowIndex) => {
    row.split('').forEach((value, columnIndex) => {
      centerGrid.setValue({ x: columnIndex + numCycles, y: rowIndex + numCycles }, value);
    });
  });
  return containerGrid;
}

function copySpace(space: I3DimensionalSpace): I3DimensionalSpace {
  const spaceCopy: I3DimensionalSpace = {};
  Object.keys(space).forEach(key => {
    spaceCopy[key] = Grid.fromGrid(space[key]);
  });
  return spaceCopy;
}

function copyFourSpace(space: Grid<Grid<string>>): Grid<Grid<string>> {
  const spaceCopy = new Grid<Grid<string>>();
  space.processCells(coord => {
    const gridCopy = Grid.fromGrid(space.getValue(coord)) as Grid<string>;
    spaceCopy.setValue(coord, gridCopy);
  });
  return spaceCopy;
}

const possibleValues = [0, 1, -1];

function createVariances(numDimensions: number) {
  const variances = [];
  const dimensionCount = Array(numDimensions).fill(0);
  for (let i = 0; i < Math.pow(possibleValues.length, numDimensions); i++) {
    const newVariance = [];
    for (let d = 0; d < numDimensions; d++) {
      newVariance.push(possibleValues[dimensionCount[d]]);
    }
    if (i !== 0) {
      // skip reference point
      variances.push(newVariance);
    }
    for (let d = 0; d < numDimensions; d++) {
      if (dimensionCount[d] + 1 < possibleValues.length) {
        dimensionCount[d]++;
        break;
      } else {
        dimensionCount[d] = 0;
      }
    }
  }
  return variances;
}
