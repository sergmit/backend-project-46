import _ from 'lodash'
import {Type} from '../fetchCompareTree.js'

const toString = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`
  }
  if (val !== null && _.isObject(val)) {
    return '[complex value]'
  }
  return val
}

const printModification = {
  [Type.Added]: (item, path) => `Property '${path}' was added with value: ${toString(item.newValue)}`,
  [Type.Removed]: (item, path) => `Property '${path}' was removed`,
  [Type.Updated]: (item, path) => `Property '${path}' was updated. From ${toString(item.oldValue)} to ${toString(item.newValue)}`,
  [Type.Equal]: () => null,
}

const formatter = (tree) => {

  const iter = (node, path) => {
    const res = [];
    for (let item of node) {
      const {key, type} = item;
      const currentPath = path ? `${path}.${key}` : key

      switch (type) {
        case Type.Added:
          res.push(printModification[Type.Added](item, currentPath))
          break;
        case Type.Updated:
          res.push(printModification[Type.Updated](item, currentPath))
          break;
        case Type.Removed:
          res.push(printModification[Type.Removed](item, currentPath))
          break;
        case Type.Nested:
          res.push(iter(item.children, currentPath))
          break;
        case Type.Equal:
          res.push(printModification[Type.Equal](item))
          break;
        default:
          throw new Error('Type not found: ' + type);
      }
    }
    return res.filter(item => item !== null).join('\n');
  }
  return iter(tree, '');
}

export default formatter
