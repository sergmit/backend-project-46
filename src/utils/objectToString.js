export default (val) => {
  if (val !== null && typeof val === 'object') {
    return '[complex value]'
  }
  return val
}