# 2019 Advent of Code

This repository is for housing my solutions to the 2020 Advent of Code (https://adventofcode.com/2020).

WARNING: There are spoilers in here for the problems. I will be pushing up my solutions as I solve them, and while I'm not racing for the leaderboard, I may have them up before other folks.

## Language Choice

This year, I will be using TypeScript as my language to solve the problems.

## Installation

To install the repository, clone it locally and then run `yarn install`.

## Testing

I will be using TDD practices and working on 100% coverage of the functions used to solve the problems.

Tests will not execute the actual solution logic, as requiring the test input needlessly slows down the tests.

* `yarn test`: Test with coverage report.
* `yarn tdd`: Test that watches changes and updates. Leave this up when developing.

## Problem Structure

Each problem will extend the Solution class that provides an `executeFirstHalf` and `executeSecondHalf` function. These functions will use the inputs and return the solution for each of the halves of the puzzle. The extended Solution class should be the default export from the `src/day-X/solution.ts` file. Other classes and data structures will be created in separate files.

## Problem Execution

To execute the logic for each problem, use the `yarn execute` script in the following format:

`yarn execute [day] (--half "first"|"second"|"both")`

Where `day` is the number of the day you want to run (1-25) and `--half` is which portion of that day's puzzles you want to run. (`half` defaults to "both".)
