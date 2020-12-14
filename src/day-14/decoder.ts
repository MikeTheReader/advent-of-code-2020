const commandSchema = /^mem\[(\d*)\] = (\d*$)/;

export function applyBitmask(commands: string[]): number {
  return runCommands(commands, applyBitmaskToValue);
}

export function memoryDecoder(commands: string[]): number {
  return runCommands(commands, applyBitmaskToAddress);
}

function runCommands(commands: string[], bitmaskFunction): number {
  let bitmaskArray;
  const memory = {};
  commands.forEach(command => {
    if (command.startsWith('mask =')) {
      bitmaskArray = command
        .split('=')[1]
        .trim()
        .split('');
      return;
    }
    bitmaskFunction(command, bitmaskArray, memory);
  });
  const nums = Object.values(memory) as number[];
  return nums.reduce((total, num) => total + num);
}

function applyBitmaskToValue(command: string, bitmaskArray: any, memory: any[]) {
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
}

function applyBitmaskToAddress(command: string, bitmaskArray: any, memory: any[]) {
  const matches = command.match(commandSchema);
  const memoryAddress = +matches[1];
  const value = +matches[2];
  const memoryBin = dec2bin(memoryAddress, '0').split('');
  bitmaskArray.forEach((mask, index) => {
    if (index < memoryBin.length) {
      if (mask !== '0') {
        memoryBin[index] = mask;
      }
    }
  });
  const smallMemoryBin = memoryBin.filter(bit => bit !== '-');
  const addressesToUpdate = getAddresses(smallMemoryBin);
  addressesToUpdate.forEach(addr => {
    memory[+addr] = value;
  });
}

function getAddresses(memBin) {
  const numX = memBin.filter(m => m === 'X').length;
  let binMask = [];
  while (binMask.length < numX) {
    binMask.push(0);
  }
  const addresses = [];
  let done = false;
  while (!done) {
    if (binMask.every(b => b !== 0)) done = true;
    let i = 0;
    const currentBin = memBin.slice(0).reverse();
    currentBin.forEach((m, index) => {
      if (m === 'X') {
        currentBin[index] = binMask[i].toString();
        i++;
      }
    });
    addresses.push(bin2dec(currentBin.reverse().join('')));
    binMask = dec2bin(parseInt(binMask.join(''), 2) + 1, '')
      .split('')
      .map(b => +b);
    while (binMask.length < numX) {
      binMask.splice(0, 0, 0);
    }
  }
  return addresses;
}

function dec2bin(dec, pad = '0') {
  let binary = (dec >>> 0).toString(2);
  if (pad) {
    while (binary.length % 36 !== 0) {
      binary = pad + binary;
    }
  }
  return binary;
}

function bin2dec(bin) {
  return parseInt(bin, 2);
}
