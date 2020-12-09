const singleBagSchema = /^(\d+)(.*)(bags?.?)$/;
export interface IBagRules {
  [bags: string]: {
    [containedBag: string]: number;
  };
}

export function parseRules(lines: string[]): IBagRules {
  const ruleObject = {};
  lines.forEach(line => {
    const [rootBag, containedBags] = line.split(' bags contain ');
    ruleObject[rootBag] = {};
    containedBags.split(', ').forEach(containedBag => {
      if (!singleBagSchema.test(containedBag)) return;
      const bagParts = containedBag.match(singleBagSchema);
      ruleObject[rootBag][bagParts[2].trim()] = +bagParts[1];
    });
  });
  return ruleObject;
}

export function findContaining(rules: IBagRules, target: string): string[] {
  return Object.keys(rules).filter(container => contains(rules, container, target));
}

function contains(rules: IBagRules, container: string, target: string): boolean {
  return Object.keys(rules[container]).some(contained => {
    if (contained === target) {
      return true;
    }
    return contains(rules, contained, target);
  });
}

export function countContainedBags(rules: IBagRules, container: string): number {
  let count = 0;
  const containerRules = rules[container];
  const bagsContained = Object.keys(containerRules);
  if (!bagsContained.length) {
    count = 1;
  } else {
    bagsContained.forEach(contained => {
      const containedBagCount = containerRules[contained];
      const bagsInContainedBag = countContainedBags(rules, contained);
      if (bagsInContainedBag !== 1) {
        count += containedBagCount;
      }
      count += containedBagCount * bagsInContainedBag;
    });
  }
  return count;
}
