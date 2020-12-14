const commandSchema = /^mem\[(\d*)\] = (\d*$)/;

export function applyBitmask(commands: string[]): number {
  let bitmaskArray;
  const memory = [];
  for (let i = 0; i < 36; i++) {
    memory[i] = 0;
  }
  commands.forEach(command => {
    if (command.startsWith('mask =')) {
      bitmaskArray = command
        .split('=')[1]
        .trim()
        .split('');
      return;
    }
    const matches = command.match(commandSchema);
    const memoryAddress = +matches[1];
    const value = +matches[2];
    const valueBin = dec2bin(value)
      .split('')
      .map(num => +num);
    bitmaskArray.forEach((mask, index) => {
      if (mask !== 'X') {
        valueBin[index] = +mask;
      }
    });
    memory[memoryAddress] = bin2dec(valueBin.join(''));
  });
  return memory.reduce((total, mem) => total + mem, 0);
}

function dec2bin(dec) {
  let binary = (dec >>> 0).toString(2);
  while (binary.length % 36 !== 0) {
    binary = '0' + binary;
  }
  return binary;
}

function bin2dec(bin) {
  return parseInt(bin, 2);
}
