import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { parsePass } from './boarding';

export default class DayFiveSolution extends Solution {
  private passIdArray: number[] = [];

  private async populateData(): Promise<void> {
    if (this.passIdArray.length === 0) {
      await processFile(this.file, line => {
        const parsedPass = parsePass(line);
        const passId = parsedPass[0] * 8 + parsedPass[1];
        this.passIdArray.push(passId);
      });
    }
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return Math.max(...this.passIdArray);
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    this.passIdArray.sort((a, b) => a - b);
    let myId = -1;
    this.passIdArray.some((currentId, index) => {
      if (currentId !== this.passIdArray[index + 1] - 1) {
        myId = currentId + 1;
        return true;
      }
      return false;
    });
    return myId;
  }
}
