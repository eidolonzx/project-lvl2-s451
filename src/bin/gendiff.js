#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-h, --help', 'output usage information')
    .option('-v, --version', 'output usage information')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv)

console.log('app is running');
