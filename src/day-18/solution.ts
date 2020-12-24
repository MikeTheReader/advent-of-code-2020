import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { evaluate } from './maths';

export default class DayEighteenSolution extends Solution {
  private data: string[] = [];

  private async populateData(): Promise<void> {
    if (this.data.length) return;
    await processFile(this.file, line => {
      this.data.push(line);
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return this.data.reduce((total, line) => {
      return total + evaluate(line);
    }, 0);
  }
}
