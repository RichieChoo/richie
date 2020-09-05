#!/usr/bin/env node
const package = require('../package.json');
const spawn = require('child_process').spawn;
const commander = require('commander');
const os = require('os');

const isRf = os.type() === 'Darwin' || os.type() === 'Linux';
const program = new commander.Command();
const defaultAlias = {
    ni: 'npm install',
    nu: 'npm update',
    nup: 'npm run update',
    nd: 'npm run dev',
    ns: 'npm run serve',
    rc: isRf ? 'rm -rf node_modules/.cache' : 'rimraf node_modules/.cache',
    nus: 'npm install && npm update && npm run serve',
    nub: 'npm install && npm update && npm run build'
};

const needClean = (key) => ['nus', 'nub'].includes(key);
const getBash = alias => needClean(alias) ? defaultAlias.rc + ' && ' + defaultAlias[alias] : defaultAlias[alias];
program
    .version(package.version, `-v, version`)
    .description('provide frequently used npm alias ')
    .arguments('<alias> [options]')
    .action((alias, options) => {
        if (defaultAlias[alias]) {
            const bash = getBash(alias)
            console.log(`npm-alias receive "${alias}" : ${bash}`);
            const [cmd, ...params] = bash.split(' ');
            const itemSpawn = spawn(cmd, params, { shell: true, detached: true, stdio: 'inherit' });

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
                    console.log(`npm-alias "${alias}" : ${bash} exited with code ${code}`);
                } else {
                    console.log(`npm-alias "${alias}" : ${bash} excuted complete!`);
                }
            });
        } else {
            console.log(`npm-alias "${alias}" is not exits !`);
        }
    })
    .on('--help', function () {
        const str = Object.keys(defaultAlias)
            .map((key) => {
                if (key !== 'rc') {
                    const itemStr = `  ${key}`.padEnd(15, ' ');
                    const valStr = getBash(key);
                    return itemStr + valStr + '\n';
                }
            })
            .filter(Boolean)
            .join('');
        console.log(str);
    });
program.parse(process.argv);
