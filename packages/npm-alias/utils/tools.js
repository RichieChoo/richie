const os = require('os');
const isRf = os.type() === 'Darwin' || os.type() === 'Linux';
const rc = isRf ? 'rm -rf node_modules/.cache' : 'rimraf node_modules/.cache';
const needClean = (key) => ['nus', 'nub'].includes(key);
const getBash = (alias) =>
    needClean(alias)
        ? defaultAlias.rc + ' && ' + defaultAlias[alias]
        : defaultAlias[alias];
module.exports = {
    getBash
}