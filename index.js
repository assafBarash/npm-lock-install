#!/usr/bin/env node
const main = require('./main');

const [, , ...packages] = process.argv;

const flags = {
  debug: 'debug',
};

console.log(packages, packages.includes(`--${flags.debug}`));

main(
  packages.filter(
    (arg) => !Object.values(flags).some((flag) => arg.includes(`--${flag}`))
  ),
  {
    debug: packages.includes(`--${flags.debug}`),
  }
);
