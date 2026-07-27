#!/usr/bin/env node

import action from '../src/commander.js'
import parsingFile from '../src/parsingFile.js'
import objectFormatter from '../src/formatters/objectFormatter.js'
import plainFormatter from '../src/formatters/plainFormatter.js'

action();

(function genDiff() {
  const args = process.argv.slice(2)
  let file1, file2, formatName = 'stylish'
  let nextFormat = false

  for (let item of args) {
    if (item === '--format' || item === '-f') {
      nextFormat = true
      continue
    }
    if (nextFormat) {
      formatName = item
      nextFormat = false
      continue
    }
    if (!file1) {
      file1 = item
      continue
    }
    if (!file2) {
      file2 = item
    }
  }

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
  let res
  switch (formatName) {
    case 'plain':
      res = plainFormatter(dataFile1, dataFile2)
      break
    case 'json':
    case 'stylish':
      res = objectFormatter(dataFile1, dataFile2)
      break
    default:
      throw new Error(`Formatter ${formatName} not found`)
  }

  console.log(res)
})()
