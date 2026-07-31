import { Type } from '../fetchCompareTree.js'

const printModification = {
  [Type.Added]: (item, level) => `${indentWithModify(level)}+ ${item.key}: ${printObj(item.newValue, level + 1)}\n`,
  [Type.Removed]: (item, level) => `${indentWithModify(level)}- ${item.key}: ${printObj(item.oldValue, level + 1)}\n`,
  [Type.Updated]: (item, level) => `${indentWithModify(level)}- ${item.key}: ${printObj(item.oldValue, level + 1)}
${indentWithModify(level)}+ ${item.key}: ${printObj(item.newValue, level + 1)}\n`,
  [Type.Equal]: (item, level) => `${indent(level)}${item.key}: ${printObj(item.oldValue, level + 1)}\n`,
  [Type.Nested]: (item, level, nestedValue) => `${indent(level)}${item.key}: ` + nestedValue,
}

const stylishFormatter = (compareTree) => {
  const iter = (tree, level = 1) => {
    let res = `{\n`
    for (let item of tree) {
      if (item.type === Type.Nested) {
        res += printModification[item.type](item, level, iter(item.children, level + 1))
        continue
      }
      res += printModification[item.type](item, level)
    }
    res += `${indent(level - 1)}}\n`
    return res
  }

  return iter(compareTree)
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

export default stylishFormatter

const indent = level => ' '.repeat(level * 4)
const indentWithModify = level => ' '.repeat(level * 4 - 2)
