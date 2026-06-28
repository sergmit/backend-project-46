import dataCompare from '../src/dataCompare.js'
import { expect, test, describe } from '@jest/globals'

describe('data compare', () => {
  test('objects compare', () => {
    const obj1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    }
    const obj2 = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    }
    const data = dataCompare(obj1, obj2)
    expect(data).toEqual(
      `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
    )
  })
})
