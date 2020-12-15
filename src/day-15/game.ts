export function playGame(targetStep: number, startingNumbers: number[]): number {
  let step = 0;
  const stepsSaid = {};
  let lastNumberSpoken = 0;
  startingNumbers.forEach(num => {
    addStep(stepsSaid, num, step);
    step++;
    lastNumberSpoken = num;
  });

  while (step < targetStep) {
    let nextNum = 0;
    const saidBefore = stepsSaid[lastNumberSpoken];
    if (saidBefore && saidBefore.length > 1) {
      nextNum = saidBefore[saidBefore.length - 1] - (saidBefore[saidBefore.length - 2] || 0);
    }
    lastNumberSpoken = nextNum;
    addStep(stepsSaid, nextNum, step);
    step++;
  }
  return lastNumberSpoken;
}

function addStep(stepsSaid, number, step) {
  if (!stepsSaid[number]) {
    stepsSaid[number] = [];
  }
  stepsSaid[number].push(step);
}
