import Grid, { Coordinate, Dimensions } from '../utils/grid';

interface IDimensionalSpace {
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

function tick(originalSpace: IDimensionalSpace): IDimensionalSpace {
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

function getNeighbors(space: IDimensionalSpace, coord: Coordinate, z: number) {
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

function parseStartData(startData: string[], numCycles: number): IDimensionalSpace {
  const startingHeight = startData.length;
  const startingWidth = startData[0].split('').length;
  const finishedDimensions: Dimensions = {
    height: numCycles * 2 + startingHeight,
    width: numCycles * 2 + startingWidth
  };
  const coordinateData: IDimensionalSpace = {};
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

function copySpace(space: IDimensionalSpace): IDimensionalSpace {
  const spaceCopy: IDimensionalSpace = {};
  Object.keys(space).forEach(key => {
    spaceCopy[key] = Grid.fromGrid(space[key]);
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
