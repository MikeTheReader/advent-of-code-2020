import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findBus } from './schedule';

export default class DayThirteenSolution extends Solution {
  private minute: number;
  private data: string;

  private async populateData(): Promise<void> {
    if (this.minute) return;
    const allData: string[] = [];
    await processFile(this.file, line => {
      allData.push(line);
    });
    this.minute = +allData[0];
    this.data = allData[1];
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return findBus(this.minute, this.data);
  }
}
