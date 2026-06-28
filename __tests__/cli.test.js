import { exec } from 'child_process'
import { promisify } from 'util'
import { describe, test, expect } from '@jest/globals'
const execAsync = promisify(exec)

describe('Cli command tests', () => {
  test('Test param help', async () => {
    const { stdout, stderr } = await execAsync('node bin/gendiff.js --help')
    expect(stderr).toBe('')
    expect(stdout).toContain('Usage:')
  })

  test('Test compare json', async () => {
    const { stdout, stderr } = await execAsync('node bin/gendiff.js filepath1.json filepath2.json')
    expect(stderr).toBe('')
    expect(stdout).toBe(
      `{
  - host: hexlet.io
  + power: 0
  - proxy: 123.234.53.22
  - timeout: 50
  + verbose: true
}
`,
    )
  })

  test('Test compare yaml', async () => {
    const { stdout, stderr } = await execAsync('node bin/gendiff.js file1.yaml file2.yaml')
    expect(stderr).toBe('')
    expect(stdout).toBe(
      `{
  - age: 25
  + age: 34
  - height: 23
  + height: 15
}
`,
    )
  })
})
