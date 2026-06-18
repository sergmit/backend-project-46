import { program } from 'commander'
const action = () => {
  program.name('gendiff')
    .description('Compares two configuration files and shows a difference.')

  program.version('0.0.1').arguments('<filename1> <filename2>')
    .description('Compares two configuration files and shows a difference.')

  program.option('-f, --format [type]', 'output format')

  program.parse()
}

export default action
