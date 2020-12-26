import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { countActiveCubes, countFourDimensions } from './conway-cubes';

export default class DaySeventeenSolution extends Solution {
  private data: string[] = [];

  private async populateData(): Promise<void> {
    if (this.data.length) return;
    await processFile(this.file, line => {
      console.log(line);
      this.data.push(line);
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return countActiveCubes(this.data, 6);
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return countFourDimensions(this.data, 6);
  }
}
