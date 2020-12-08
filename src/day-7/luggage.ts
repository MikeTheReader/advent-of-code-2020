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
