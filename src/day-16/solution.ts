import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { findFields, scanTickets } from './ticket';
export default class DaySixteenSolution extends Solution {
  private rules: string[] = [];
  private myTicket: number[] = [];
  private nearbyTickets: number[][] = [];

  private async populateData(): Promise<void> {
    if (this.rules.length) return;
    let section = 'rules';
    await processFile(this.file, line => {
      if (line.trim() === '') return;
      if (line === 'your ticket:') {
        section = 'your ticket';
        return;
      }
      if (line === 'nearby tickets:') {
        section = 'nearby tickets';
        return;
      }
      if (section === 'rules') {
        this.rules.push(line);
      } else if (section === 'your ticket') {
        this.myTicket = line.split(',').map(num => +num);
      } else {
        this.nearbyTickets.push(line.split(',').map(num => +num));
      }
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return scanTickets(this.rules, this.nearbyTickets);
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    const ticketFields = findFields(this.rules, this.myTicket, this.nearbyTickets);
    return Object.keys(ticketFields).reduce((total, field) => {
      if (field.startsWith('departure')) {
        return total * ticketFields[field];
      }
      return total;
    }, 1);
  }
}
