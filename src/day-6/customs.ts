export function countYes(group: string[]): number {
  return group.reduce((yesQuestions, person) => {
    person.split('').forEach(question => yesQuestions.add(question));
    return yesQuestions;
  }, new Set<string>()).size;
}

export function countAllYes(group: string[]): number {
  return group.reduce((yesQuestions, person, index) => {
    if (index === 0) {
      person.split('').forEach(question => yesQuestions.add(question));
    } else {
      const personYesses = person.split('');
      yesQuestions.forEach(yes => {
        if (!personYesses.includes(yes)) {
          yesQuestions.delete(yes);
        }
      });
    }
    return yesQuestions;
  }, new Set<string>()).size;
}
