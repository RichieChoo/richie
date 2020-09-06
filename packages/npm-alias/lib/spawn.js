
const spawn = require('child_process').spawn;
module.exports = (bash, shortName, options = { shell: true, detached: true, stdio: 'inherit' }) => {
    const [cmd, ...params] = bash.split(' ');
    const itemSpawn = spawn(cmd, params, options);

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
            console.log(`npm-alias "${shortName}" : ${bash} exited with code ${code}`);
        } else {
            console.log(`npm-alias "${shortName}" : ${bash} excuted complete!`);
        }
    });
}