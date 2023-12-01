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
const exampleInput = readFile("puzzles/day-01/input.txt");

const parseInput = (rawInput) => rawInput;

export const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const strings = input.split("\n");
  const numbers = strings.map((string) =>
    string.split("").filter((l) => /^\d+$/.test(l))
  );
  const sums = numbers
    .map((number) => +(number[0] + number[number.length - 1]))
    .reduce((ac, cv) => ac + cv, 0);

  return sums;
};

export const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = [
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [4, "four"],
    [5, "five"],
    [6, "six"],
    [7, "seven"],
    [8, "eight"],
    [9, "nine"],
  ];
  const strings = input.split("\n");
  const filtered = strings.map((str) => {
    const cont = [];
    for (let i = 1; i <= str.length; i++) {
      const text = str.slice(0, i);
      numbers.forEach((lett) => {
        // if (text.endsWith(lett[0]) || text.endsWith(lett[1])) {
        //   cont.push(lett[0]);
        // }
        for (let j = text.length; j >= 0; j--) {
          if (
            lett[0].toString() === text.slice(j, text.length) ||
            lett[1] === text.slice(j, text.length)
          ) {
            cont.push(lett[0]);
            break;
          }
        }
      });
    }
    return cont;
  });

  return filtered.reduce((ac, cv) => ac + +`${cv[0]}${cv[cv.length - 1]}`, 0);
};

// You can use the dev mode adding a console log here
console.log(part2(exampleInput));
