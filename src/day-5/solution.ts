import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { parsePass } from './boarding';

export default class DayFiveSolution extends Solution {
  private passArray: string[] = [];

  private async populateData(): Promise<void> {
    if (this.passArray.length === 0) {
      await processFile(this.file, line => {
        this.passArray.push(line);
      });
    }
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return this.passArray.reduce((max, currentPass) => {
      const parsedPass = parsePass(currentPass);
      return Math.max(max, parsedPass[0] * 8 + parsedPass[1]);
    }, -1);
  }
}
