import {exec} from 'child_process';
import {promisify} from 'util';
import {describe, test, expect} from "@jest/globals";
const execAsync = promisify(exec);

describe('Cli command tests', () => {
  test('Test param help', async () => {
    const { stdout, stderr } = await execAsync('node bin/gendiff.js --help');
    expect(stderr).toBe('');
    expect(stdout).toContain('Usage:');
  })

  test('Test compare json', async () => {
    const { stdout, stderr } = await execAsync('node bin/gendiff.js filepath1.json filepath2.json');
    expect(stderr).toBe('');

  })
})