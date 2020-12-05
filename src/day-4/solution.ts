import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import { fieldValidations } from './validations';
export default class DayFourSolution extends Solution {
  private async parseFile() {
    const passportStrings = await this.readPassportLines();
    return this.convertLinesToObjects(passportStrings);
  }

  private async readPassportLines(): Promise<string[]> {
    const passports: string[] = [];
    let nextPassport: string;
    await processFile(this.file, line => {
      if (line === '') {
        if (nextPassport) {
          passports.push(nextPassport.trim());
        }
        nextPassport = '';
      }
      if (!nextPassport) {
        nextPassport = '';
      }
      nextPassport += ` ${line}`;
    });
    passports.push(nextPassport); // Catch the last one
    return passports;
  }

  private convertLinesToObjects(lines: string[]): unknown[] {
    return lines.map(line => {
      const passportObject = {};
      const keyValuePairs = line.split(' ');
      keyValuePairs.forEach(keyValuePair => {
        const [key, value] = keyValuePair.split(':');
        passportObject[key] = value;
      });
      return passportObject;
    });
  }

  public async executeFirstHalf(): Promise<number> {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const passports = await this.parseFile();
    const validPassports = passports.filter(passport => {
      const valid = requiredFields.every(field => passport[field]);
      return valid;
    });
    return validPassports.length;
  }

  public async executeSecondHalf(): Promise<number> {
    const passports = await this.parseFile();
    const requiredFields = Object.keys(fieldValidations);
    const validPassports = passports.filter(passport => {
      if (!requiredFields.every(field => passport[field])) return false;
      return requiredFields.every(field => {
        return fieldValidations[field](passport[field]);
      });
    });
    return validPassports.length;
  }
}
