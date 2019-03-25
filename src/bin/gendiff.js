#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    // .option('-h, --help', 'output usage information')
    // .option('-v, --version', 'output usage information')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .parse(process.argv)

console.log('app is running');
