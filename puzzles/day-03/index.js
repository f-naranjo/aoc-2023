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
const exampleInput = readFile("puzzles/day-03/test_input.txt");

const parseInput = (rawInput) => rawInput;
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const coordinatesY = input.split("\n");
  const points = [];
  const symbols = [];
  coordinatesY.forEach((row, idx) => {
    const allPoints = row.split("");
    let lastPointEndIndex = 0;
    allPoints.forEach((point, index) => {
      const isNumber = numbers.includes(point);
      if (!isNumber && point !== ".") {
        symbols.push({ x: index, y: idx });
        lastPointEndIndex = index + 1;
        return;
      }
      if (point === ".") {
        lastPointEndIndex = index + 1;
      }
      if (isNumber) {
        if (!numbers.includes(allPoints[index + 1])) {
          let point = "";
          for (let i = lastPointEndIndex; i <= index; i++) {
            point = point + allPoints[i];
          }
          points.push({ point, x: [lastPointEndIndex, index], y: idx });
          lastPointEndIndex = index;
        }
      }
    });
  });
  const validPoints = points.filter((point) => {
    const getNearXPoints = (point) => {
      const xArr = [];
      for (let i = point.x[0] - 1; i <= point.x[point.x.length - 1] + 1; i++) {
        xArr.push(i);
      }
      return xArr.filter((n) => n >= 0 && !!n);
    };
    const validXPoints = getNearXPoints(point);
    const test = symbols.find((symbol) => {
      const validY =
        symbol.y === point.y ||
        symbol.y === point.y + 1 ||
        symbol.y === point.y - 1;
      const validX = validXPoints.includes(symbol.x);
      return validY && validX;
    });
    return !!test;
  });
  return validPoints.reduce((ac, point) => ac + +point.point, 0);
};

export const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const coordinatesY = input.split("\n");
  const symbols = [];
  const allPoints = coordinatesY.map((row) => row.split(""));
  allPoints.forEach((row, idx) => {
    row.forEach((point, index) => {
      if (point === "*") {
        symbols.push({ x: index, y: idx });
      }
    });
  });

  const generateValidMatrix = (point) => {
    const validPoints = [];
    for (let i = point.y - 1; i <= point.y + 1; i++) {
      for (let j = point.x - 1; j <= point.x + 1; j++) {
        validPoints.push({ x: j, y: i });
      }
    }
    return validPoints;
  };
  const validEngines = [];
  symbols.forEach((engine) => {
    let numberOfValidNearPoints = 0;
    const pointsToCheck = generateValidMatrix(engine);
    pointsToCheck.forEach((pnt) => {
      const symbolToCheck = allPoints[pnt.y][pnt.x];
      if (numbers.includes(symbolToCheck)) {
        numberOfValidNearPoints = numberOfValidNearPoints + 1;
      }
    });
  });

  return;
};

// You can use the dev mode adding a console log here
console.log(part2(exampleInput));
