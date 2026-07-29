import _ from 'lodash'

export const Type = {
  Equal: 'equal',
  Added: 'added',
  Updated: 'updated',
  Removed: 'removed',
  Nested: 'nested',
}

const fetchCompareTree = (obj1, obj2) => {
  const res = []
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()
  for (let key of keys) {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      res.push(
        {
          key,
          type: Type.Nested,
          children: fetchCompareTree(obj1[key], obj2[key]),
          oldValue: null,
          newValue: null,
        },
      )
      continue
    }
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] === obj2[key]) {
      res.push(
        {
          key,
          type: Type.Equal,
          children: null,
          oldValue: obj1[key],
          newValue: obj1[key],
        },
      )
      continue
    }
    if (obj1[key] !== undefined && obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      res.push(
        {
          key,
          type: Type.Updated,
          children: null,
          oldValue: obj1[key],
          newValue: obj1[key],
        },
      )
      continue
    }
    if (obj1[key] !== undefined && obj2[key] === undefined) {
      res.push(
        {
          key,
          type: Type.Removed,
          children: null,
          oldValue: obj1[key],
          newValue: null,
        },
      )
      continue
    }
    if (obj1[key] === undefined && obj2[key] !== undefined) {
      res.push(
        {
          key,
          type: Type.Added,
          children: null,
          oldValue: null,
          newValue: obj2[key],
        },
      )
    }
  }
  return res
}

export default fetchCompareTree
