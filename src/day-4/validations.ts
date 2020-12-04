const hairColorSchema = /#[0-9a-f]{6}/;
const pidSchema = /^[0-9]{9}$/;
const heightSchema = /(\d*)(in|cm)/;

export const fieldValidations = {
  byr: validateNumRange(1920, 2002),
  iyr: validateNumRange(2010, 2020),
  eyr: validateNumRange(2020, 2030),
  hgt: validateHeight,
  hcl: validateHairColor,
  ecl: validateEyeColor,
  pid: validatePID
};

function validateNumRange(min: number, max: number): (value: string) => boolean {
  return value => {
    return +value >= min && +value <= max;
  };
}

function validateHairColor(value: string): boolean {
  return hairColorSchema.test(value);
}

function validatePID(value: string): boolean {
  return pidSchema.test(value);
}

function validateHeight(value: string): boolean {
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

function validateEyeColor(value: string): boolean {
  const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return validEyeColors.includes(value);
}
