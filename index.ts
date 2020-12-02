// tslint:disable: no-console
import * as chalk from 'chalk';
import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

commander
  .command('execute <day>')
  .version('2018.0.1')
  .description('Executes the solution logic for a given day in the advent of code (1-25).')
  .option('--half [half]', 'Which half of the day to excute, "first", "second", or "both"', 'both')
  .action(async (day, options) => {
    try {
      await execute(day, options.half);
    } catch(e) {
      console.log(e.message);
    }
  });

commander.parse(process.argv);

async function execute(day: number, half: string) {
  console.log('Inside execute', day, half);
  const inputFile = path.join(__dirname, 'inputs', `day_${day}_input.txt`);

  const solutionPath = `./src/day-${day}/solution.ts`;
  console.log(solutionPath)
  if (!fs.existsSync(solutionPath)) {
    throw new Error(`No solution file provided for day ${day}.`)
  }
  const Solution = await import(solutionPath);
  const solution = new Solution.default(inputFile);

  console.log(`Running day ${chalk.yellow(day)}:`);

  if (half === 'both' || half === 'first') {
    const start = +new Date();
    const firstHalfResults = getStringResults(await solution.executeFirstHalf());
    const timeElapsed = +new Date() - start;
    console.log(`\tFirst half: ${chalk.blue(firstHalfResults)} (${chalk.grey(timeElapsed)} ms)`);
  }

  if (half === 'both' || half === 'second') {
    const start = +new Date();
    const secondHalfResults = getStringResults(await solution.executeSecondHalf());
    const timeElapsed = +new Date() - start;
    console.log(`\tSecond half: ${chalk.blue(secondHalfResults)} (${chalk.grey(timeElapsed)} ms)`);
  }
}

function getStringResults(results):string {
  if (typeof results !== 'string') {
    return JSON.stringify(results, null, 2);
  }
  return results;
}
