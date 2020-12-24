export function evaluate(expression: string): number {
  let simpleExpression = '';
  let depth = 0;
  let subExpression = '';
  expression.split('').forEach(character => {
    if (character === '(') {
      depth += 1;
      if (depth === 1) return;
    }
    if (character === ')') {
      depth -= 1;
      if (depth === 0) {
        simpleExpression += evaluate(subExpression);
        subExpression = '';
        return;
      }
    }
    if (depth === 0) {
      simpleExpression += character;
    } else {
      subExpression += character;
    }
  });
  return evaluateSimpleExpression(simpleExpression);
}

function evaluateSimpleExpression(expression: string): number {
  const steps = expression.split(' ');
  let currentOperation;
  return steps.reduce((total, step, index) => {
    if (step === '') return total;
    if (index === 0) return +step;
    if (!Number.isFinite(+step)) {
      currentOperation = step;
      return total;
    }
    let evalString = total.toString();
    evalString += currentOperation;
    evalString += step;
    return eval(evalString);
  }, 0);
}
