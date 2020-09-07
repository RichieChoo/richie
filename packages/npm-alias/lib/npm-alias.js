#!/usr/bin/env node
const package = require('../package.json');
const spawn = require('../utils/spawn');
const commander = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const configAlias = require("../config/alias.json")
const first = path.basename(process.argv[1])
console.warn('first',first);
const program = new commander.Command();
if (first === 'ra' || process.env.Development) {
    program
        .version(package.version, `-v, version`)
        .command("config")
        .description(`config ${package.name} setting`)
        .action(() => {
            console.log("开发中...")
        })

    program.command("add-alias")
        .description(`set custom aliases for ${package.name}`)
        .action(() => {
            console.log("add-alias开发中...")
        })

    program.command("reset-alias")
        .description(`reset current aliases for ${package.name}`)
        .option('--revert-all', 'Remove sauce')
        .action(opts => {
            console.log(opts)
            console.log("reset-alias开发中...")
        })

    program.on('--help', function () {
        const str = Object.keys(configAlias)
            .map((key) => {
                const itemStr = `  ${key}`.padEnd(18, ' ');
                const valStr = configAlias[key];
                return itemStr + valStr + '\n';
            })
            .join('');
        console.log(str);
    });


    program.parse(process.argv);
} else if (configAlias[first]) {
    const bash = configAlias[first];
    console.log(`npm-alias receive "${first}" : ${bash}`);
    spawn(bash, first);
}

