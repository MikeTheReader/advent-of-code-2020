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
