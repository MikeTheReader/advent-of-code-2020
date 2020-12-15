import Solution from '../solution-base';
import { playGame } from './game';

export default class DayFifteenSolution extends Solution {
  public async executeFirstHalf(): Promise<number> {
    return playGame(2020, [8, 11, 0, 19, 1, 2]);
  }

  public async executeSecondHalf(): Promise<number> {
    return playGame(30000000, [8, 11, 0, 19, 1, 2]);
  }
}
