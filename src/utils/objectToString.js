export default (val) => {
  if (typeof val === 'string') {
    return `'${val}'`
  }
  if (val !== null && typeof val === 'object') {
    return '[complex value]'
  }
  return val
}
