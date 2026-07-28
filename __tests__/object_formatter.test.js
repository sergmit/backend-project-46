import stylishFormatter from '../src/formatters/stylishFormatter.js'
import { expect, test, describe } from '@jest/globals'

describe('data compare', () => {
  test('objects compare', () => {
    const obj1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      nested: {
        test: 8,
      },
    }
    const obj2 = {
      verbose: true,
      power: 0,
      nested: {
        test: 5,
      },
    }
    const data = stylishFormatter(obj1, obj2)
    expect(data).toEqual(
      `{
  - host: hexlet.io
    nested: {
      - test: 8
      + test: 5
    }
  + power: 0
  - proxy: 123.234.53.22
  - timeout: 50
  + verbose: true
}
`,
    )
  })
})
