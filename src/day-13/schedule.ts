import Big from 'big.js';

export function findBus(readyMinute: number, busses: string): number {
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

export function winContest(busses: string): number {
  const busNumbers = busses.split(',');
  const divisors = [];
  busNumbers.forEach((busNumber, index) => {
    if (busNumber !== 'x') {
      divisors.push({ busNumber: new Big(+busNumber), minute: index });
    }
  });
  const product = divisors.reduce((total, div) => total.times(div.busNumber), new Big(1));
  const partialProducts = divisors.map(div => product.div(div.busNumber));
  const inverses = divisors.map((div, index) => computeInverse(partialProducts[index], divisors[index].busNumber));
  const sum = divisors.reduce((total, div, index) => {
    total = total.plus(partialProducts[index].times(inverses[index]).times(div.busNumber.minus(div.minute)));
    return total;
  }, new Big(0));
  return sum.mod(product).toNumber();
}

function computeInverse(a: Big, m: Big): Big {
  a = a.mod(m);
  for (let x = new Big(1); x.lt(m); x = x.plus(1)) {
    if (
      a
        .times(x)
        .mod(m)
        .eq(1)
    )
      return x;
  }
}
