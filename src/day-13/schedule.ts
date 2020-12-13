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
      divisors.push({ busNumber, minute: index });
    }
  });
  let num = 1;
  let answer = -1;
  while (answer === -1) {
    const matches = divisors.every(div => {
      return (num + div.minute) % div.busNumber === 0;
    });
    if (matches) {
      answer = num;
      break;
    }
    console.log(num);
    num++;
  }
  return answer;
}
