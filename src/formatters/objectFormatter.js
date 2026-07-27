import toString from '../utils/objectToString.js'
const objectFormatter = (obj1, obj2, level = 1) => {
  let res = `{\n`
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

  for (let key of keys) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      res += `${indent(level)}${key}: ` + objectFormatter(obj1[key], obj2[key], level + 1)
      continue
    }
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] === obj2[key]) {
      res += `${indent(level)}${key}: ${obj1[key]}\n`
    }
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      res += `${indentWithModify(level)}- ${key}: ${obj1[key]}\n`
      res += `${indentWithModify(level)}+ ${key}: ${obj2[key]}\n`
    }
    if (obj1[key] !== undefined && obj2[key] === undefined) {
      res += `${indentWithModify(level)}- ${key}: ${obj1[key]}\n`
    }
    if (obj1[key] === undefined && obj2[key] !== undefined) {
      res += `${indentWithModify(level)}+ ${key}: ${obj2[key]}\n`
    }
  }

  res += `${indent(level - 1)}}\n`

  return res
}

export default objectFormatter

const indent = level => ' '.repeat(level * 4)
const indentWithModify = level => ' '.repeat(level * 4 - 2)
