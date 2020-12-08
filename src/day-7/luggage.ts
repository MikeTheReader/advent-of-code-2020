const singleBagSchema = /^(\d+)(.*)(bags?.?)$/;

export function parseRules(lines: string[]): any {
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

export function findContaining(rules: any, target: string): string[] {
  return Object.keys(rules).filter(container => contains(rules, container, target));
}

function contains(rules: any, container: string, target: string): boolean {
  return Object.keys(rules[container]).some(contained => {
    if (contained === target) {
      return true;
    }
    return contains(rules, contained, target);
  });
}
