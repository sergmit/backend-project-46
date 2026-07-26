const toString = (val) => {
  if (val !== null && typeof val === 'object') {
    return '[complex value]'
  }
  return val
}
const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}
function flattenObject(obj1, obj2, prefix = '', result1 = {}, result2 = {}) {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

  for (let key of keys) {
    if (Object.hasOwn(obj1, key) || Object.hasOwn(obj2, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key

      if (isObject(obj1[key]) && isObject(obj2[key])) {
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

const formatter = (item1, item2) => {
  let { result1: obj1, result2: obj2 } = flattenObject(item1, item2)
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()
  let outcome = ''
  for (let key of keys) {
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      outcome += `Property '${key}' was updated from ${toString(obj1[key])} to ${toString(obj2[key])}\n`
    }
    if (obj1[key] !== undefined && obj2[key] === undefined && obj1[key] !== obj2[key]) {
      outcome += `Property '${key}' was removed\n`
    }
    if (obj1[key] === undefined && obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      outcome += `Property '${key}' was added with value: ${toString(obj2[key])}\n`
    }
  }

  return outcome
}

export default formatter
