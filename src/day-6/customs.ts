export function countYes(group: string[]): number {
  return group.reduce((yesQuestions, person) => {
    person.split('').forEach(question => yesQuestions.add(question));
    return yesQuestions;
  }, new Set<string>()).size;
}
