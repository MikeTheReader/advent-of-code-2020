export function findInvalidNumber(preambleLength: number, data: number[]): number {
  let index = 0;
  let candidate: number;
  while (index < data.length - preambleLength) {
    const preamble = data.slice(index, index + preambleLength);
    candidate = data[index + preambleLength];
    let matchFound = false;
    for (let i = 0; i < preamble.length; i++) {
      for (let j = 0; j < preamble.length; j++) {
        if (j === i) continue;
        if (preamble[j] + preamble[i] === candidate) {
          matchFound = true;
        }
      }
    }
    if (!matchFound) {
      break;
    }
    index++;
  }
  return candidate;
}

export function findEncryptionWeakness(preambleLength: number, data: number[]): number {
  const targetNumber = findInvalidNumber(preambleLength, data);
  let index = 0;
  let size = 1;
  let group: number[] = [];
  let groupFound = false;
  while (!groupFound) {
    while (index + size < data.length) {
      group = data.slice(index, index + size);
      const sum = group.reduce((result, number) => result + number);
      if (sum === targetNumber) {
        groupFound = true;
        break;
      } else if (sum > targetNumber) {
        size = 1;
        break;
      }
      size++;
    }
    index++;
  }

  return Math.max(...group) + Math.min(...group);
}
