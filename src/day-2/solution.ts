import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { checkPassword, checkPositionPassword } from './password';

export default class DayTwoSolution extends Solution {
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
    return this.passArray.filter(checkPassword).length;
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return this.passArray.filter(checkPositionPassword).length;
  }
}
