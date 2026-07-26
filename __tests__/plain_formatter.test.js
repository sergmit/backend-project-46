import plainFormatter from '../src/formatters/plainFormatter.js'
import { expect, test, describe } from '@jest/globals'

describe('formatter', () => {
  test('plain formatter', () => {
    const obj1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      complex: 7,
      nested: {
        test: 8,
      },
      complexA: {
        complexB: {
          complexC: 12,
          complexD: {
            complexE: 18,
            complexF: false,
          },
        },
      },
    }
    const obj2 = {
      verbose: true,
      power: 0,
      nested: {
        test: 5,
      },
      complex: {
        value: 5,
      },
      complexA: {
        complexB: {
          complexC: 23,
          complexD: {
            complexE: 15,
            complexF: null,
          },
        },
      },
    }
    const data = plainFormatter(obj1, obj2)
    expect(data).toEqual(`Property 'complex' was updated from 7 to [complex value]
Property 'complexA.complexB.complexC' was updated from 12 to 23
Property 'complexA.complexB.complexD.complexE' was updated from 18 to 15
Property 'complexA.complexB.complexD.complexF' was updated from false to null
Property 'host' was removed
Property 'nested.test' was updated from 8 to 5
Property 'power' was added with value: 0
Property 'proxy' was removed
Property 'timeout' was removed
Property 'verbose' was added with value: true
`)
  })
})
