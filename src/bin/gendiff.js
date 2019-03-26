#!/usr/bin/env node
import commander from 'commander';
// import gendiff from '..';

const program = commander;

program
  .version('0.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
// .action((file1, file2) => console.log(gendiff(file1, file2)))
  .parse(process.argv);
