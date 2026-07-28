import fs from 'fs'
import * as path from 'node:path'
import { load } from 'js-yaml'

const fetchParser = (val) => {
  console.log('fetch parser')
  return {
    '.json': JSON.parse(val),
    '.yml': load(val),
    '.yaml': load(val),
  }
}

const parsingFile = (filePath) => {
  if (fs.existsSync(filePath) === false) {
    throw new Error(`No such file ${filePath}`)
  }
  const ext = path.extname(filePath)
  const content = fs.readFileSync(filePath)
  if (content) {
    const dataString = content.toString()
    const parser = fetchParser(dataString)
    return parser[ext]
  }
}

export default parsingFile
