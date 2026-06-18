#!/usr/bin/env node

import action from '../src/commander.js'
import parsingFile from '../src/parsingFile.js'
import dataCompare from '../src/dataCompare.js'

action()

const data = parsingFile('filepath1.json')
console.log(data);

(function genDiff() {
  console.log('gendiff', process.argv)
  const dataFile1 = parsingFile(process.argv[2])
  const dataFile2 = parsingFile(process.argv[3])
  const res = dataCompare(dataFile1, dataFile2)
  console.log('res', res)
  // const dataFile2 = parsingFile(file2);
})()
