import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';

export default class DayOneSolution extends Solution {
  public async executeFirstHalf(): Promise<number> {
    const numArray: number[] = [];
    await processFile(this.file, line => {
      numArray.push(+line);
    });
    const [numOne, numTwo] = this.findTwoNumbers(numArray, 2020);
    return numOne * numTwo;
  }

  public async executeSecondHalf(): Promise<number> {
    const numArray: number[] = [];
    await processFile(this.file, line => {
      numArray.push(+line);
    });
    const [numOne, numTwo, numThree] = this.findThreeNumbers(numArray, 2020);
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
