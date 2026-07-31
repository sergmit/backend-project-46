import { expect, test, describe } from '@jest/globals'
import fs from "fs";
import * as path from "node:path";
import { genDiff } from "../src/genDiff.js";

describe('data compare', () => {
  const file1 = path.join(import.meta.dirname, '..', '__fixtures__', 'filepath_nested1.json')
  const file2= path.join(import.meta.dirname, '..', '__fixtures__', 'filepath_nested2.json')
  test('compare stylish', () => {
    const expectedStylish = fs.readFileSync(path.join(import.meta.dirname, '..', '__fixtures__', 'stylish_expected.txt'), 'utf-8')

    let data = genDiff(file1, file2, 'stylish')
    expect(data).toEqual(expectedStylish)
  })

  test('compare plain', () => {
    const expectedPlain = fs.readFileSync(path.join(import.meta.dirname, '..', '__fixtures__', 'plain_expected.txt'), 'utf-8')

    const data = genDiff(file1, file2, 'plain');
    expect(data).toEqual(expectedPlain)
  })

  test('compare json', () => {
    const expectedJson = fs.readFileSync(path.join(import.meta.dirname, '..', '__fixtures__', 'json_expected.txt'), 'utf-8')

    const data = genDiff(file1, file2, 'json');
    expect(data).toEqual(expectedJson)
  })
})
