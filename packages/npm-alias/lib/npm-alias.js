#!/usr/bin/env node
const package = require('../package.json');
const spawn = require('child_process').spawn;
const commander = require('commander');
const { option } = require('commander');

const program = new commander.Command();
const defaultAlias = {
	ni: 'npm install',
	nu: 'npm update',
	nup: 'npm run update',
	nd: 'npm run dev',
	ns: 'npm run serve',
	nus: 'npm install && npm update && npm run serve',
	nub: 'rm -rf node_modules/.cache && npm install && npm update && npm run build'
};

program
	.version(package.version, `-v, version`)
	.description('provide frequently used npm alias ')
	.arguments('<alias> [options]')
	.action((alias, options) => {
        if (defaultAlias[alias]) {
            console.log(`Alias receive "${alias}" : ${defaultAlias[alias]}`)
			const [ cmd, ...params ] = defaultAlias[alias].split(' ');
			const itemSpawn = spawn(cmd, params, { detached: true, stdio: 'inherit' });

			itemSpawn.stdout &&
				itemSpawn.stdout.on('data', (data) => {
					console.log(data.toString());
				});

			itemSpawn.stderr &&
				itemSpawn.stderr.on('data', (data) => {
					console.error(data.toString());
				});

			itemSpawn.on('close', (code) => {
				if (code !== 0) {
					console.log(`Alias "${alias}" : ${defaultAlias[alias]} exited with code ${code}`);
				} else {
					console.log(`Alias "${alias}" : ${defaultAlias[alias]} excuted complete!`);
				}
			});
		} else {
			console.log(`Alias "${alias}" is not exits !`);
		}
	});
program.parse(process.argv);
