const schemaRegex = /(\d*)-(\d*) (\w): (\w*)/;

export function checkPassword(passSchema: string): boolean {
  const match = passSchema.match(schemaRegex);
  const min = +match[1];
  const max = +match[2];
  const letter = match[3];
  const password = match[4];
  return validatePassword(min, max, letter, password);
}

function validatePassword(min: number, max: number, letter: string, password: string): boolean {
  const letterCount = password.split('').filter(cLetter => cLetter === letter).length;
  return letterCount >= min && letterCount <= max;
}

export function checkPositionPassword(passSchema: string): boolean {
  const match = passSchema.match(schemaRegex);
  const firstPosition = +match[1];
  const secondPosition = +match[2];
  const letter = match[3];
  const password = match[4];
  return validatePositionPassword(firstPosition, secondPosition, letter, password);
}

function validatePositionPassword(firstPos: number, secondPos: number, letter: string, password: string): boolean {
  const passArray = password.split('');
  const matchFirstPos = passArray[firstPos - 1] === letter;
  const matchSecondPos = passArray[secondPos - 1] === letter;
  return matchFirstPos !== matchSecondPos;
}
