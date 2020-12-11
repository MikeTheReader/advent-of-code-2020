import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findEncryptionWeakness, findInvalidNumber } from './port';

export default class DayNineSolution extends Solution {
  private data: number[] = [];

  private async populateData(): Promise<void> {
    if (this.data.length) return;
    await processFile(this.file, line => {
      this.data.push(+line);
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return findInvalidNumber(25, this.data);
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return findEncryptionWeakness(25, this.data);
  }
}
