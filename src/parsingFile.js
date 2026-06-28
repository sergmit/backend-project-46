import fs from 'fs'
import * as path from 'node:path'
import { parse } from 'yaml'

const parsingFile = (file, dir = 'data') => {
  const filePath = path.resolve(process.cwd(), dir, file)
  if (fs.existsSync(filePath) === false) {
    throw new Error(`No such file ${file}`)
  }
  const ext = path.extname(file)
  const content = fs.readFileSync(filePath)
  if (content) {
    const dataString = content.toString()
    switch (ext) {
      case '.json':
        return JSON.parse(dataString)
      case '.yaml':
      case '.yml':
        return parse(dataString)
      default:
        throw new Error(`Extension ${ext} not found`)
    }
  }
  throw new Error('Не удалось спарсить файл')
}

export default parsingFile
