export default (obj1, obj2) => {
  let res = '{\n'
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

  keys.forEach((key) => {
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] === obj2[key]) {
      res += `    ${key}: ${obj1[key]}\n`
    }
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      res += `  - ${key}: ${obj1[key]}\n`
      res += `  + ${key}: ${obj2[key]}\n`
    }
    if (obj1[key] !== undefined && obj2[key] === undefined) {
      res += `  - ${key}: ${obj1[key]}\n`
    }
    if (obj1[key] === undefined && obj2[key] !== undefined) {
      res += `  + ${key}: ${obj2[key]}\n`
    }
  })
  res += '}'

  return res
}
