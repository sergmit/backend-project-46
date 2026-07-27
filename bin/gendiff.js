#!/usr/bin/env node

import action from '../src/commander.js'
import parsingFile from '../src/parsingFile.js'
import stylishFormatter from '../src/formatters/stylishFormatter.js'
import plainFormatter from '../src/formatters/plainFormatter.js'
import jsonFormatter from "../src/formatters/jsonFormatter.js";

action()

function genDiff(file1, file2, format = 'stylish') {
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
  switch (format) {
    case 'plain':
      res = plainFormatter(dataFile1, dataFile2)
      break
    case 'json':
      res = jsonFormatter(dataFile1, dataFile2)
      break;
    case 'stylish':
      res = stylishFormatter(dataFile1, dataFile2)
      break
    default:
      throw new Error(`Formatter ${format} not found`)
  }

  return res.trim()
}

export default genDiff;
