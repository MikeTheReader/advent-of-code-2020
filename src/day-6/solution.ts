import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { countYes } from './customs';

export default class DaySixSolution extends Solution {
  private groupArray: string[][] = [];

  private async populateData(): Promise<void> {
    let currentGroup: string[] = [];
    await processFile(this.file, line => {
      if (line === '') {
        this.groupArray.push(currentGroup);
        currentGroup = [];
      } else {
        currentGroup.push(line);
      }
    });
    this.groupArray.push(currentGroup);
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return this.groupArray.reduce((total, group) => {
      total += countYes(group);
      return total;
    }, 0);
  }

  public async executeSecondHalf(): Promise<number> {
    return 0;
  }
}
