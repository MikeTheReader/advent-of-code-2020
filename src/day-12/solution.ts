import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findDistance, findWaypointDistance } from './navigation';

export default class DayElevenSolution extends Solution {
  private data: string[] = [];

  private async populateData(): Promise<void> {
    if (this.data.length) return;
    await processFile(this.file, line => {
      this.data.push(line);
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return findDistance(this.data);
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return findWaypointDistance(this.data);
  }
}
