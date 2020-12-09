interface IProgramOutput {
  accumulator: number;
  isLoop: boolean;
}

const commandSchema = /^(\w*) ([-+]?[0-9]*)$/;

export function findLoop(commands: string[]): IProgramOutput {
  const stepsRun = [];
  let currentStep = 0;
  let accumulator = 0;
  let isLoop = false;
  while (currentStep < commands.length) {
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
    if (stepsRun.includes(currentStep)) {
      isLoop = true;
      break;
    }
  }
  return { accumulator, isLoop };
}

export function fixProgram(commands: string[]): number {
  let find = 'jmp';
  let replace = 'nop';
  let index = 0;
  let terminated = false;
  let returnValue: number;

  while (!terminated) {
    const commandCopy = commands.slice(0);
    let i = 0;
    for (i = index; i < commandCopy.length; i++) {
      if (commands[index].startsWith(find)) {
        index = i;
        break;
      }
    }
    commandCopy[index] = commandCopy[index].replace(find, replace);
    const result = findLoop(commandCopy);
    if (result.isLoop === false) {
      returnValue = result.accumulator;
      terminated = true;
    }
    if (index >= commands.length - 1) {
      if (find === 'jmp') {
        find = 'nop';
        replace = 'jmp';
        index = 0;
      } else {
        break;
      }
    }
    index++;
  }

  return returnValue;
}
