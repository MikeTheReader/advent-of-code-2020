const commandSchema = /^(\w*) ([-+]?[0-9]*)$/;

export function findLoop(commands: string[]): number {
  const stepsRun = [];
  let currentStep = 0;
  let accumulator = 0;
  while (!stepsRun.includes(currentStep)) {
    const currentCommand = commands[currentStep];
    stepsRun.push(currentStep);
    const matches = currentCommand.match(commandSchema);
    const instruction = matches[1];
    const amount = +matches[2];
    if (instruction === 'nop') {
      currentStep++;
    } else if (instruction === 'acc') {
      accumulator += amount;
      currentStep++;
    } else if (instruction === 'jmp') {
      currentStep += amount;
    }
  }
  return accumulator;
}
