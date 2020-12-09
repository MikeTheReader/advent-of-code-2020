import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findLoop, fixProgram } from './console';

export default class DayEightSolution extends Solution {
  private commands: string[] = [];

  private async populateData(): Promise<void> {
    if (this.commands.length) return;
    await processFile(this.file, line => {
      this.commands.push(line);
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return findLoop(this.commands).accumulator;
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return fixProgram(this.commands);
  }
}
