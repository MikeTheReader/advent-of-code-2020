export interface Dimensions {
  height: number;
  width: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export default class Grid<T> {
  public static fromGrid(grid: Grid<unknown>): Grid<unknown> {
    const newGrid = new Grid();
    grid.processCells(coord => {
      newGrid.setValue(coord, grid.getValue(coord));
    });
    return newGrid;
  }

  private gridArrays: T[][] = [];

  public fill(value: T, dimensions: Dimensions): void {
    this.gridArrays = [];
    for (let y = 0; y < dimensions.height; y++) {
      this.gridArrays[y] = [];
      for (let x = 0; x < dimensions.width; x++) {
        this.gridArrays[y][x] = value;
      }
    }
  }

  public getValue({ x, y }: Coordinate): T {
    if (!this.gridArrays[y]) {
      return null;
    }
    return this.gridArrays[y][x];
  }

  public setValue({ x, y }: Coordinate, value: T): void {
    if (!this.gridArrays[y]) {
      this.gridArrays[y] = [] as T[];
    }
    this.gridArrays[y][x] = value;
  }

  public findInGrid(value: T): Coordinate[] {
    const matches: Coordinate[] = [];
    this.processCells(coord => {
      if (this.getValue(coord) === value) {
        matches.push(coord);
      }
    });
    return matches;
  }

  public processCells(callback: (coord: Coordinate, index: number) => void): void {
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    let index = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        callback({ x, y }, index++);
      }
    }
  }

  public processCellsInRadar(center: Coordinate, callback: (coord: Coordinate, index: number) => void): void {
    const anglePoints = [];
    this.processCells(cell => {
      if (JSON.stringify(cell) !== JSON.stringify(center)) {
        const angle = Math.atan2(cell.x - center.x, cell.y - center.y) * (180 / Math.PI);
        anglePoints.push({ angle, point: cell });
      }
    });

    anglePoints.sort((a, b) => {
      if (a.angle !== b.angle) {
        return b.angle - a.angle;
      }

      const aDistance = Math.abs(center.x - a.point.x) + Math.abs(center.y - a.point.y);
      const bDistance = Math.abs(center.x - b.point.x) + Math.abs(center.y - b.point.y);
      return aDistance - bDistance;
    });

    anglePoints.forEach(({ point }, index) => {
      callback(point, index);
    });
  }

  public processSpiral(center: Coordinate, callback: (coord: Coordinate, index: number) => void): void {
    let radius = 1;
    let index = 0;
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    while (
      center.x - radius > -1 ||
      radius + center.x < width ||
      center.y - radius > -1 ||
      radius + center.y < height
    ) {
      const ranges = this.getRangeForBoxAround(center, radius);
      let y = ranges.yRange.min;
      let x = ranges.xRange.min;

      // left
      for (; x < ranges.xRange.max; x++) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      // down
      for (; y < ranges.yRange.max; y++) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      // up
      for (; x > ranges.xRange.min; x--) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      // right
      for (; y > ranges.yRange.min; y--) {
        if (!(x === center.x && y === center.y)) {
          callback({ x, y }, index++);
        }
      }

      radius++;
    }
  }

  public toString(): string {
    const width = this.gridArrays[0].length;
    let gridStr = '';
    this.processCells((coord, index) => {
      gridStr += this.getValue(coord) + ' ';
      if ((index + 1) % width === 0) {
        gridStr += '\n';
      }
    });
    return gridStr;
  }

  public getGridArrays(): T[][] {
    return this.gridArrays;
  }

  public setGridArrays(gridArrays: T[][]): void {
    this.gridArrays = gridArrays;
  }

  public rotate(): Grid<T> {
    const tempCopy = Grid.fromGrid(this) as Grid<T>;
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    this.fill(null, { height, width });

    let column = 0;
    for (let x = 0; x < width; x++) {
      let row = 0;
      for (let y = height - 1; y > -1; y--) {
        this.setValue({ x: row, y: column }, tempCopy.getValue({ x, y }));
        row++;
      }
      column++;
    }
    return this;
  }

  public flipHorizontal(): Grid<T> {
    this.gridArrays.reverse();
    return this;
  }

  private getRangeForBoxAround(center: Coordinate, radius: number) {
    const height = this.gridArrays.length;
    const width = this.gridArrays[0].length;
    const xRange = { max: Math.min(center.x + radius, width - 1), min: Math.max(center.x - radius, 0) };
    const yRange = { max: Math.min(center.y + radius, height - 1), min: Math.max(center.y - radius, 0) };
    return { xRange, yRange };
  }
}
