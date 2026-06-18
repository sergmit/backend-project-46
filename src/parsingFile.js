import fs from 'fs'
import * as path from 'node:path'

const parsingFile = (file) => {
  const filePath1 = path.resolve(process.cwd(), 'data', file)
  const content = fs.readFileSync(filePath1)
  if (content) {
    return JSON.parse(content.toString())
  }
}

export default parsingFile
