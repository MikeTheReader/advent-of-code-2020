import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { countContainedBags, findContaining, IBagRules, parseRules } from './luggage';

export default class DaySixSolution extends Solution {
  private rules: IBagRules = {};

  private async populateData(): Promise<void> {
    const lines = [];
    await processFile(this.file, line => {
      lines.push(line);
    });
    this.rules = parseRules(lines);
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return findContaining(this.rules, 'shiny gold').length;
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    return countContainedBags(this.rules, 'shiny gold');
  }
}
