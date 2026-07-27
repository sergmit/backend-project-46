import { program } from 'commander'
import {genDiff} from '../bin/gendiff.js'
const action = () => {
  program.name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filename1> <filename2>')
    .option('-f, --format <string>', 'Format output')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2, program.opts().format));
    })
  program.parse()
}

export default action
