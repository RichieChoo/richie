// if windows, change rm -rf to rimraf
const os = require('os');
const path = require('path');
const isWindows = os.type() === 'Windows_NT';
if (isWindows) {
  const aliasPath = path.join(process.cwd(), 'config', 'alias.json');
  console.log(aliasPath);
}
