import { program } from 'commander'
const action = () => {
  program.name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filename1> <filename2>')
    .option('-f, --format <string>', 'Format output')
  program.parse()
}

export default action
