#!/usr/bin/env node

import { program } from 'commander';

program.name('gendiff').description('Compares two configuration files and shows a difference.');

program.option('-V, --version', 'output the version number')

program.parse();

export default function genDiff (file1, file2) {

}