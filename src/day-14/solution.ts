import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { applyBitmask } from './decoder';

export default class DayThirteenSolution extends Solution {
  private data: string[] = [];

  private async populateData(): Promise<void> {
    if (this.data.length) return;
    await processFile(this.file, line => {
      this.data.push(line);
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return applyBitmask(this.data);
  }
}
