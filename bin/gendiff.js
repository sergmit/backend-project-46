#!/usr/bin/env node

import action from '../src/commander.js'
import parsingFile from '../src/parsingFile.js'
import dataCompare from '../src/dataCompare.js'

action();

(function genDiff() {
  const args = process.argv.slice(2)
  let file1, file2

  args.forEach((item, i) => {
    if (i === 0) {
      file1 = item
    }
    if (i === 1) {
      file2 = item
    }
  })

  const dir = process.env.NODE_ENV === 'test'
    ? '__fixtures__'
    : 'data'

  let dataFile1, dataFile2
  try {
    dataFile1 = parsingFile(file1, dir)
    dataFile2 = parsingFile(file2, dir)
  }
  catch (e) {
    console.error(e.message)
    return
  }

  const res = dataCompare(dataFile1, dataFile2)
  console.log(res)
})()
