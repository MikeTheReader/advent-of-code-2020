import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { applyBitmask, memoryDecoder } from './decoder';

export default class DayFourteenSolution extends Solution {
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

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return memoryDecoder(this.data);
  }
}
