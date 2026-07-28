const jsonFormatter = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

  const res = {}
  for (let key of keys) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      res[key] = jsonFormatter(obj1[key], obj2[key])
    }

    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] === obj2[key]) {
      res[key] = {
        value: obj1[key],
      }
    }

    if (obj1[key] !== undefined && obj2[key] === undefined && obj1[key] !== obj2[key]) {
      res[key] = {
        status: 'updated',
        oldValue: obj1[key],
        value: obj2[key],
      }
    }
    if (obj1[key] !== undefined && obj2[key] === undefined && obj1[key] !== obj2[key]) {
      res[key] = {
        status: 'removed',
        oldValue: obj1[key],
      }
    }
    if (obj1[key] === undefined && obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      res[key] = {
        status: 'added',
        value: obj2[key],
      }
    }
  }
  return JSON.stringify(res)
}

export default jsonFormatter
