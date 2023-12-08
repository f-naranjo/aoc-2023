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
const exampleInput = readFile("puzzles/day-05/input.txt");

const parseInput = (rawInput) => rawInput;

const getNextPoint = (mapArr, point) => {
  let nextPoint = point;
  for (let i = 0; i < mapArr.length; i++) {
    let x = mapArr[i][1];
    let y = mapArr[i][0];
    let z = mapArr[i][2];
    if (point >= x && point <= x + (z - 1)) {
      const dif = point - x;
      nextPoint = dif + y;
      console.log("point encontrado", point, x, y, z, "toca:", dif + y);
      break;
    }
    console.log("no lo encontro, sigue con ", point);
  }

  return nextPoint;
};

const getLocation = (seeds, maps) => {
  return seeds.map((seed) => {
    let point = seed;
    for (let i = 0; i < maps.length; i++) {
      point = getNextPoint(maps[i], point);
    }
    return point;
  });
};

export const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const seeds = input
    .split("\n")[0]
    .split(" ")
    .filter((i, idx) => idx !== 0)
    .map((n) => +n);

  let currentMap = "";
  const maps = input
    .split("\n")
    .slice(2)
    .reduce((ac, cv) => {
      if (cv.includes(":")) {
        currentMap = cv.replace(" map:", "");
        return { ...ac, [currentMap]: [] };
      } else {
        if (cv !== "") {
          return {
            ...ac,
            [currentMap]: [...ac[currentMap], cv.split(" ").map((n) => +n)],
          };
        }
        return ac;
      }
    }, {});
  return getLocation(seeds, Object.values(maps)).sort((a, b) =>
    a > b ? 1 : -1
  );
};

export const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

// You can use the dev mode adding a console log here
console.log(part1(exampleInput));
