import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findArrangementCount, findJumps } from './joltage';

export default class DayTenSolution extends Solution {
  private data: number[] = [];

  private async populateData(): Promise<void> {
    if (this.data.length) return;
    await processFile(this.file, line => {
      this.data.push(+line);
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    const jumps = findJumps(this.data);
    return jumps.one * jumps.three;
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return findArrangementCount(this.data);
  }
}
