#!/usr/bin/env node

import action from "../src/commander.js";
import parsingFile from "../src/parsingFile.js";

action();

const data = parsingFile('filepath1.json');
console.log(data);

export default function genDiff (file1, file2) {
    const dataFile1 = parsingFile(file1);
    const dataFile2 = parsingFile(file2);
}