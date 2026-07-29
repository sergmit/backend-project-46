import _ from 'lodash'
import fetchCompareTree, { Type } from '../fetchCompareTree.js'

const toString = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`
  }
  if (val !== null && _.isObject(val)) {
    return '[complex value]'
  }
  return val
}

function flattenObject(obj1, obj2, prefix = '', result1 = {}, result2 = {}) {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

  for (let key of keys) {
    if (Object.hasOwn(obj1, key) || Object.hasOwn(obj2, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key

      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        flattenObject(obj1[key], obj2[key], newKey, result1, result2)
      }
      else {
        if (obj1[key] !== undefined) {
          result1[newKey] = obj1[key]
        }
        if (obj2[key] !== undefined) {
          result2[newKey] = obj2[key]
        }
      }
    }
  }
  return { result1, result2 }
}

const printModification = {
  [Type.Added]: item => `Property '${item.key}' was added with value: ${toString(item.newValue)}\n`,
  [Type.Removed]: item => `Property '${item.key}' was removed\n`,
  [Type.Updated]: item => `Property '${item.key}' was updated. From ${toString(item.oldValue)} to ${toString(item.newValue)}\n`,
}

const formatter = (item1, item2) => {
  let { result1: obj1, result2: obj2 } = flattenObject(item1, item2)
  const compareTree = fetchCompareTree(obj1, obj2)
  let res = ''

  for (let item of compareTree) {
    res += printModification[item.type](item)
  }

  return res
}

export default formatter
