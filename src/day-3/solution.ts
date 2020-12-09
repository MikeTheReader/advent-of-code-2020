import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';

interface ISlope {
  right: number;
  down: number;
}

const firstSlope: ISlope = {
  right: 3,
  down: 1
};

const slopes: ISlope[] = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 }
];

export default class DayThreeSolution extends Solution {
  private grid: string[][] = [];

  private async populateData(): Promise<void> {
    if (this.grid.length) return;
    let width: number;
    await processFile(this.file, line => {
      width = line.length;
      this.grid.push(line.split(''));
    });
    this.expandGrid(width);
  }

  private expandGrid(width: number) {
    const maxSlope = slopes.reduce((currentMax, slope) => Math.max(currentMax, slope.right), 0);
    const numberOfCopies = Math.ceil(this.grid.length / (width / maxSlope));
    this.grid = this.grid.map(row => {
      const origRow = row.slice(0);
      for (let i = 0; i < numberOfCopies; i++) {
        row = row.concat(origRow);
      }
      return row;
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return this.countTrees(firstSlope);
  }

  private countTrees(slope: ISlope) {
    let x = 0;
    let y = 0;
    let treeCount = 0;
    while (y < this.grid.length) {
      if (this.grid[y][x] === '#') {
        treeCount++;
      }
      x += slope.right;
      y += slope.down;
    }
    return treeCount;
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return slopes.reduce((currentCount, slope) => {
      currentCount *= this.countTrees(slope);
      return currentCount;
    }, 1);
  }
}
