import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';

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
    const requiredFields = Object.keys(this.fieldValidations);
    const validPassports = passports.filter(passport => {
      if (!requiredFields.every(field => passport[field])) return false;
      return requiredFields.every(field => {
        const valid = this.fieldValidations[field](passport[field]);
        return valid;
      });
    });
    return validPassports.length;
  }

  private hairColorSchema = /#[0-9a-f]{6}/;
  private pidSchema = /^[0-9]{9}$/;

  private fieldValidations = {
    byr: this.validateNumRange(1920, 2002),
    iyr: this.validateNumRange(2010, 2020),
    eyr: this.validateNumRange(2020, 2030),
    hgt: this.validateHeight.bind(this),
    hcl: this.validateHairColor.bind(this),
    ecl: this.validateEyeColor.bind(this),
    pid: this.validatePID.bind(this)
  };

  private validateNumRange(min: number, max: number): (value: string) => boolean {
    return value => {
      return +value >= min && +value <= max;
    };
  }

  private validateHairColor(value) {
    return this.hairColorSchema.test(value);
  }

  private validatePID(value) {
    return this.pidSchema.test(value);
  }

  private validateHeight(value) {
    const heightSchema = /(\d*)(in|cm)/;
    if (!heightSchema.test(value)) return false;
    const matches = value.match(heightSchema);
    const numString = matches[1];
    const units = matches[2];
    const num = +numString;
    if (units === 'in') {
      return num >= 59 && num <= 76;
    }
    return num >= 150 && num <= 193;
  }

  private validateEyeColor(value) {
    const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return validEyeColors.includes(value);
  }
}
