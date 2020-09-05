#!/usr/bin/env node

const package = require('../package.json');
const commander = require('commander');
commander.version(package.version, `-v, --version`);
commander.parse(process.argv);