import { expect, test, describe } from '@jest/globals'
import parsingFile from "../src/parsingFile.js";

describe('Parsing files test', () => {
  test('parsing file json', () => {
    const data = parsingFile('filepath1.json', '__fixtures__');
    expect(data).toEqual({
      host: "hexlet.io",
      timeout: 50,
      proxy: "123.234.53.22"
    })
  })

  test('parsing file yaml', () => {
    const data = parsingFile('file1.yaml', '__fixtures__');
    expect(data).toEqual({
      height: 23,
      age: 25
    })
  })
})