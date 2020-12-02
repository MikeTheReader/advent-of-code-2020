import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';

export default class DayOneSolution extends Solution {
  private numArray: number[] = [];

  private async populateData(): Promise<void> {
    if (this.numArray.length === 0) {
      await processFile(this.file, line => {
        this.numArray.push(+line);
      });
    }
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    const [numOne, numTwo] = this.findTwoNumbers(this.numArray, 2020);
    return numOne * numTwo;
  }

  public async executeSecondHalf(): Promise<number> {
    await this.populateData();
    const [numOne, numTwo, numThree] = this.findThreeNumbers(this.numArray, 2020);
    return numOne * numTwo * numThree;
  }

  private findTwoNumbers(array, total): number[] {
    let matchingNumbers: number[];
    array.forEach((numOne, index) => {
      array.slice(index).forEach(numTwo => {
        if (numOne + numTwo === total) {
          matchingNumbers = [numOne, numTwo];
        }
      });
    });
    return matchingNumbers;
  }

  private findThreeNumbers(array, total): number[] {
    let matchingNumbers: number[];
    array.forEach((numOne, index) => {
      array.slice(index).forEach((numTwo, indexTwo) => {
        array.slice(indexTwo).forEach(numThree => {
          if (numOne + numTwo + numThree === total) {
            matchingNumbers = [numOne, numTwo, numThree];
          }
        });
      });
    });
    return matchingNumbers;
  }
}
