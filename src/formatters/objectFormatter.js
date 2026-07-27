const objectFormatter = (obj1, obj2, level = 1) => {
  let res = `{\n`
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

  for (let key of keys) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      res += `${indent(level)}${key}: ` + objectFormatter(obj1[key], obj2[key], level + 1)
      continue
    }
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] === obj2[key]) {
      res += `${indent(level)}${key}: ${printObj(obj1[key], level + 1)}\n`
    }
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      res += `${indentWithModify(level)}- ${key}: ${printObj(obj1[key], level + 1)}\n`
      res += `${indentWithModify(level)}+ ${key}: ${printObj(obj2[key], level + 1)}\n`
    }
    if (obj1[key] !== undefined && obj2[key] === undefined) {
      res += `${indentWithModify(level)}- ${key}: ${printObj(obj1[key], level + 1)}\n`
    }
    if (obj1[key] === undefined && obj2[key] !== undefined) {
      res += `${indentWithModify(level)}+ ${key}: ${printObj(obj2[key], level + 1)}\n`
    }
  }

  res += `${indent(level - 1)}}\n`

  return res.trim()
}

const printObj = (obj, level = 1) => {
  if (['string', 'number', 'boolean'].includes(typeof obj) || obj === null) {
    return `${obj}`
  }
  let res = '{\n'
  for (let key in obj) {
    res += `${indent(level)}${key}: ${printObj(obj[key], level + 1)}\n`
  }
  res += `${indent(level - 1)}}`
  return res
}

export default objectFormatter

const indent = level => ' '.repeat(level * 4)
const indentWithModify = level => ' '.repeat(level * 4 - 2)
