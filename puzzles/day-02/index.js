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
const exampleInput = readFile("puzzles/day-02/input.txt");

const parseInput = (rawInput) => rawInput;

export const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const games = input.split("\n");
  const resultObj = { green: 13, red: 12, blue: 14 };
  const options = Object.keys(resultObj);
  const validGamesArr = [];
  const checkGames = (resultsArr) => {
    let validResults = [];
    resultsArr.forEach((result) => {
      options.forEach((option) => {
        if (result.includes(option)) {
          const number = result.replace(option, "").trim();
          if (+number <= resultObj[option]) {
            validResults.push(true);
          }
        }
      });
    });
    return resultsArr.length === validResults.length;
  };

  games.forEach((game) => {
    const gameArr = game.split(":");
    const title = gameArr[0].replace("Game ", "");
    const results = gameArr[1].split(", ");
    const resultsDef = results.map((res) => res.split(";")).flat();

    if (checkGames(resultsDef)) {
      validGamesArr.push(+title);
    }
  }, []);

  return validGamesArr.reduce((ac, cv) => ac + cv, 0);
};

export const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const games = input.split("\n");
  const resultObj = { green: 13, red: 12, blue: 14 };
  const options = Object.keys(resultObj);
  const checkGames = (resultsArr) => {
    let maxNumberOfColor = { red: 0, green: 0, blue: 0 };
    resultsArr.forEach((result) => {
      options.forEach((option) => {
        if (result.includes(option)) {
          const number = result.replace(option, "").trim();
          if (+number > maxNumberOfColor[option]) {
            maxNumberOfColor[option] = +number;
          }
        }
      });
    });
    return Object.values(maxNumberOfColor).reduce((ac, cv) => ac * cv, 1);
  };

  const gamesResume = games.reduce((ac, game) => {
    const gameArr = game.split(":");
    const results = gameArr[1].split(", ");
    const resultsDef = results.map((res) => res.split(";")).flat();

    return ac + checkGames(resultsDef);
  }, 0);

  return gamesResume;
};

// You can use the dev mode adding a console log here
console.log(part2(exampleInput));
