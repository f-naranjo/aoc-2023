/**
 * Welcome to in Advent of code
 * Use these comments to learn how to work on your solutions. You can later delete them and adjust this template to your liking at `/src/template/js`
 *
 * Go to https://adventofcode.com/<year>/day/<dayNum> (the link is at the README file in this same folder) and read the problem statement.
 * The problem includes an input example that you can use to work on your solution. You can copy that input example and use it to check you're on the right track.
 * The real input is much bigger and is downloaded automatically for you at input.txt.
 *
 * Create a input-example.txt and use the readFile function to read its contents.
 * You can use the dev mode `pnpm dev <dayNum>` and log the invoking of your function at the bottom of this file.
 *
 * Then, once you've solved the problem you can use send mode `pnpm send <dayNum>`.
 * The send mode gets your functions exported here (part1 and part2, DON'T CHANGE THE NAMES) and runs them automagically passing the real input to them.
 * You will see the result in the console and be able to submit it to Advent of code.
 *
 * Do you have questions? Join the AoC channel in Slack!
 *
 * Happy coding!
 */

import { readFile } from "./utils.js";

// You can use readFile this way
const exampleInput = readFile("puzzles/day-06/input.txt");

const parseInput = (rawInput) => rawInput;

const getWaysOfWinning = (time, record) => {
  let ways = 0;
  for (let speed = 0; speed <= time; speed++) {
    const timeLeft = time - speed;
    const distance = timeLeft * speed;
    if (distance > record) {
      ways = ways + 1;
    }
  }
  return ways;
};

export const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const times = input
    .split("\n")[0]
    .replace("Time:", "")
    .split(" ")
    .map((t) => t.trim())
    .filter((i) => !!i);
  const records = input
    .split("\n")[1]
    .replace("Distance:", "")
    .split(" ")
    .map((t) => t.trim())
    .filter((i) => !!i);

  return times
    .map((t, i) => {
      return getWaysOfWinning(t, records[i]);
    })
    .reduce((ac, cv) => ac * cv, 1);
};

export const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const time = input
    .split("\n")[0]
    .replace("Time:", "")
    .split(" ")
    .map((t) => t.trim())
    .filter((i) => !!i)
    .join("");
  const record = input
    .split("\n")[1]
    .replace("Distance:", "")
    .split(" ")
    .map((t) => t.trim())
    .filter((i) => !!i)
    .join("");

  return getWaysOfWinning(time, record);
};

console.log(part2(exampleInput));
