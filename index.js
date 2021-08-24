#!/usr/bin/env node
const main = require('./main');

const [, , ...packages] = process.argv;

main(packages);
