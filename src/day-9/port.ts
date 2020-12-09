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
