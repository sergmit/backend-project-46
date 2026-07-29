import { expect, test, describe } from '@jest/globals'
import fs from "fs";
import * as path from "node:path";
import genDiff from "../src/genDiff.js";

describe('data compare', () => {
  test('objects compare', () => {
    console.log('path', path.join(import.meta.dirname, '..','__fixtures__', 'stylish_expected.txt'))
    const expectedStylish = fs.readFileSync(path.join(import.meta.dirname, '..', '__fixtures__', 'stylish_expected.txt'), 'utf-8')
    const expectedPlain = fs.readFileSync(path.join(import.meta.dirname, '..', '__fixtures__', 'plain_expected.txt'), 'utf-8')
    const file1 = path.join(import.meta.dirname, '..', '__fixtures__', 'filepath_nested1.json')
    const file2= path.join(import.meta.dirname, '..', '__fixtures__', 'filepath_nested2.json')
    let data = genDiff(file1, file2, 'stylish')
    expect(data).toEqual(expectedStylish)

    data = genDiff(file1, file2, 'plain');
    expect(data).toEqual(expectedPlain)
  })
})
