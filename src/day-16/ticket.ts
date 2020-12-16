const rulesSchema = /^(.*): (\d*)-(\d*) or (\d*)-(\d*)$/;

export function scanTickets(rules: string[], nearbyTickets: number[][]): number {
  const validateFunctions = rules.map(rule => {
    const matches = rule.match(rulesSchema);
    return ruleTester(+matches[2], +matches[3], +matches[4], +matches[5]);
  });
  const invalidNumbers = [];
  nearbyTickets.forEach(ticket => {
    ticket.forEach(ticketNum => {
      const matchesRule = validateFunctions.some(func => func(ticketNum));
      if (!matchesRule) {
        invalidNumbers.push(ticketNum);
      }
    });
  });
  return invalidNumbers.reduce((total, num) => total + num);
}

function ruleTester(
  firstLow: number,
  firstHigh: number,
  secondLow: number,
  secondHigh: number
): (num: number) => boolean {
  return function(testNumber: number) {
    return (testNumber >= firstLow && testNumber <= firstHigh) || (testNumber >= secondLow && testNumber <= secondHigh);
  };
}
