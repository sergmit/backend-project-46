import parsingFile from './parsingFile.js'
import stylishFormatter from './formatters/stylishFormatter.js'
import plainFormatter from './formatters/plainFormatter.js'

function genDiff(file1, file2, format = 'stylish') {
  let dataFile1, dataFile2
  try {
    dataFile1 = parsingFile(file1)
    dataFile2 = parsingFile(file2)
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
      res = JSON.stringify(dataFile1)
      break
    case 'stylish':
      res = stylishFormatter(dataFile1, dataFile2)
      break
    default:
      throw new Error(`Formatter ${format} not found`)
  }

  return res.trim()
}

export default genDiff
