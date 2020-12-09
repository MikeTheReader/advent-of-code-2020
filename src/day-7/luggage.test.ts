import { countContainedBags, findContaining, IBagRules, parseRules } from './luggage';

describe('luggage', () => {
  const ruleData: IBagRules = {
    'light red': {
      'bright white': 1,
      'muted yellow': 2
    },
    'dark orange': {
      'bright white': 3,
      'muted yellow': 4
    },
    'bright white': {
      'shiny gold': 1
    },
    'muted yellow': {
      'shiny gold': 2,
      'faded blue': 9
    },
    'shiny gold': {
      'dark olive': 1,
      'vibrant plum': 2
    },
    'dark olive': {
      'faded blue': 3,
      'dotted black': 4
    },
    'vibrant plum': {
      'faded blue': 5,
      'dotted black': 6
    },
    'faded blue': {},
    'dotted black': {}
  };
  describe('parseRules', () => {
    it('creates correct data structure for sample data', () => {
      const lines = [
        'light red bags contain 1 bright white bag, 2 muted yellow bags.',
        'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
        'bright white bags contain 1 shiny gold bag.',
        'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
        'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
        'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
        'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
        'faded blue bags contain no other bags.',
        'dotted black bags contain no other bags.'
      ];
      expect(parseRules(lines)).toEqual(ruleData);
    });
  });
  describe('findContaining', () => {
    it('finds the correct number of containing bags', () => {
      expect(findContaining(ruleData, 'shiny gold').length).toBe(4);
    });
  });
  describe('countContainedBags', () => {
    it('finds the correct number of all bags contained in a shiny gold bag', () => {
      expect(countContainedBags(ruleData, 'shiny gold')).toBe(32);
    });
    it('finds the correct number of all bags in the second test case', () => {
      const lines = [
        'shiny gold bags contain 2 dark red bags.',
        'dark red bags contain 2 dark orange bags.',
        'dark orange bags contain 2 dark yellow bags.',
        'dark yellow bags contain 2 dark green bags.',
        'dark green bags contain 2 dark blue bags.',
        'dark blue bags contain 2 dark violet bags.',
        'dark violet bags contain no other bags.'
      ];
      const rules = parseRules(lines);
      expect(countContainedBags(rules, 'shiny gold')).toBe(126);
    });
  });
});
