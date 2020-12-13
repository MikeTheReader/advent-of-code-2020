export function findBus(readyMinute: number, busses: string) {
  const busNumbers = busses
    .split(',')
    .filter(num => num !== 'x')
    .map(n => +n);
  const minutesOut = busNumbers.map(bus => {
    const minuteDifference = Math.ceil(readyMinute / bus) * bus - readyMinute;
    return { bus, minuteDifference };
  });
  let smallestBus = null;
  let smallestMinute = Infinity;
  minutesOut.forEach(minuteOut => {
    if (minuteOut.minuteDifference < smallestMinute) {
      smallestBus = minuteOut.bus;
      smallestMinute = minuteOut.minuteDifference;
    }
  });
  return smallestBus * smallestMinute;
}

export function winContest(busses: string) {
  const busNumbers = busses.split(',');
  const divisors = [];
  busNumbers.forEach((busNumber, index) => {
    if (busNumber !== 'x') {
      divisors.push({ busNumber: +busNumber, minute: index });
    }
  });
  const product = divisors.reduce((total, div) => total * div.busNumber, 1);
  const partialProducts = divisors.map(div => product / div.busNumber);
  const inverses = divisors.map((div, index) => computeInverse(partialProducts[index], divisors[index].busNumber));
  const sum = divisors.reduce((total, div, index) => {
    total += partialProducts[index] * inverses[index] * (div.busNumber - div.minute);
    return total;
  }, 0);
  return sum % product;
}

function computeInverse(a, m) {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m == 1) return x;
  }
}
