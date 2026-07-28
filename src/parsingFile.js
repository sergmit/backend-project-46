import fs from 'fs'
import * as path from 'node:path'
import {load} from 'js-yaml'

const fetchParser = (val) => {
  return {
    '.json': () => JSON.parse(val),
    '.yml': () => load(val),
    '.yaml': () => load(val),
  }
}

const parsingFile = (filePath) => {
  if (fs.existsSync(filePath) === false) {
    throw new Error(`No such file ${filePath}`)
  }
  const ext = path.extname(filePath)
  const content = fs.readFileSync(filePath, 'utf-8')
  if (content) {
    const parser = fetchParser(content)
    return parser[ext]()
  }
}

export default parsingFile
