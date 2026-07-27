import { program } from 'commander'
const action = () => {
  program.name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <string>', 'Format output')
    .action(async (filepath1, filepath2) => {
      const { default: genDiff } = await import('../bin/gendiff.js');
      console.log(genDiff(filepath1, filepath2, program.opts().format))
    })
  if (process.argv.length < 3) {
    program.outputHelp()
  }
  else {
    program.parse()
  }
}

export default action
