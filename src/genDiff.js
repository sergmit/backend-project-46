import parsingFile from './parsingFile.js'
import stylishFormatter from './formatters/stylishFormatter.js'
import plainFormatter from './formatters/plainFormatter.js'
import {program} from "commander";
import jsonFormatter from "./formatters/jsonFormatter.js";
import fetchCompareTree from "./fetchCompareTree.js";

const action = () => {
  program.name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <string>', 'Format output')
    .action(async (filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2, program.opts().format))
    })
  if (process.argv.length < 3) {
    program.outputHelp()
  }
  else {
    program.parse()
  }
}

const formatter = {
  plain: plainFormatter,
  stylish: stylishFormatter,
  json: jsonFormatter
}

export function genDiff(file1, file2, format = 'stylish') {
  let dataFile1, dataFile2
  try {
    dataFile1 = parsingFile(file1)
    dataFile2 = parsingFile(file2)
  }
  catch (e) {
    console.error(e.message)
    return
  }

  const tree = fetchCompareTree(dataFile1, dataFile2);

  return formatter[format](tree)?.trim()
}

export default action
