#!/usr/bin/env node
const alias = {
	ni: 'npm install',
	nu: 'npm update',
	nup: 'npm run update',
	nd: 'npm run dev',
	ns: 'npm run serve',
	nus: 'rm -rf node_modules/.cache && npm install && npm update && npm run serve',
	nub: 'rm -rf node_modules/.cache && npm install && npm update && npm run build'
};

const package = require('../package.json');
const exec = require('child_process').exec;
const commander = require('commander');
commander
	.version(package.version, `-v, --version`)
	.option('-i,ni', alias.ni)
	.option('-u,nu', alias.nu)
	.option('-up,nup', alias.nup)
	.option('-ud,nd', alias.nd)
	.option('-us,nus', alias.nus)
	.option('-ub,nub', alias.nd);
commander.parse(process.argv);
Object.entries(alias).forEach(([ key, val ]) => {
	if (commander[key]) {
		exec(val);
	}
});
