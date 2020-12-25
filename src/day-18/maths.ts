function evaluate(expression: string, evalFunction: (exp: string) => number): number {
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
        simpleExpression += evaluate(subExpression, evalFunction);
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
  return evalFunction(simpleExpression);
}

export function evaluateAdvanced(expression: string): number {
  return evaluate(expression, evaluateAdvancedExpression);
}

export function evaluateBasic(expression: string): number {
  return evaluate(expression, evaluateBasicExpression);
}

function evaluateBasicExpression(expression: string): number {
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

function evaluateAdvancedExpression(expression: string): number {
  // add first
  let currentExpression = expression;
  let newExp = '';
  while (newExp !== currentExpression) {
    newExp = currentExpression;
    currentExpression = currentExpression.replace(/\d* \+ \d*/i, function(exp) {
      return eval(exp);
    });
  }
  return eval(currentExpression);
}
