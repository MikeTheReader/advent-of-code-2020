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

export function findFields(rules: string[], yourTicket: number[], nearbyTickets: number[][]) {
  const fieldMap = {};
  rules.forEach(rule => {
    const matches = rule.match(rulesSchema);
    fieldMap[matches[1]] = ruleTester(+matches[2], +matches[3], +matches[4], +matches[5]);
  });
  nearbyTickets = removeInvalidTickets(nearbyTickets, fieldMap);
  const possibilities = initializePossibilities(fieldMap);
  checkTicket(yourTicket, possibilities, fieldMap);
  nearbyTickets.forEach(ticket => checkTicket(ticket, possibilities, fieldMap));
  logicallyNarowDown(possibilities);
  return mapYourTicketFields(possibilities, yourTicket);
}

function mapYourTicketFields(possibilities, yourTicket: number[]) {
  const seatProperties = {};
  Object.keys(possibilities).forEach(fieldIndex => {
    const fieldName = possibilities[fieldIndex][0];
    seatProperties[fieldName] = yourTicket[fieldIndex];
  });
  return seatProperties;
}

function logicallyNarowDown(possibilities) {
  let narrowedDown = false;
  while (!narrowedDown) {
    Object.keys(possibilities).forEach(fieldIndex => {
      if (possibilities[fieldIndex].length === 1) {
        Object.keys(possibilities).forEach(indx => {
          if (possibilities[indx].length > 1) {
            const matchingFieldIndex = possibilities[indx].indexOf(possibilities[fieldIndex][0]);
            if (matchingFieldIndex > -1) {
              possibilities[indx].splice(matchingFieldIndex, 1);
            }
          }
        });
      }
    });
    narrowedDown = Object.keys(possibilities).every(fieldIndex => possibilities[fieldIndex].length === 1);
  }
}

function initializePossibilities(fieldMap) {
  const possibilities = {};
  Object.keys(fieldMap).forEach((field, fieldIndex) => {
    const possArray = [];
    Object.keys(fieldMap).forEach(fieldName => {
      possArray.push(fieldName);
    });
    possibilities[fieldIndex] = possArray;
  });
  return possibilities;
}

function removeInvalidTickets(nearbyTickets: number[][], fieldMap) {
  nearbyTickets = nearbyTickets.filter(ticket => {
    return ticket.every(ticketNum => {
      return Object.keys(fieldMap).some(field => fieldMap[field](ticketNum));
    });
  });
  return nearbyTickets;
}

function checkTicket(ticket: number[], possibilities, fieldMap) {
  ticket.forEach((num, index) => {
    const possArray = possibilities[index];
    possibilities[index] = possArray.filter(field => {
      return fieldMap[field](num);
    });
  });
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
