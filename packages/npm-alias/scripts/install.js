// if windows, change rm -rf to rimraf
const os = require('os');
const path = require('path');
const fs = require('fs');
const package = require('../package.json');
const isWindows = os.type() === 'Windows_NT';
const aliasPath = path.join(process.cwd(), 'config', 'alias.json');
const before = isWindows ? 'rm -rf' : 'rimraf';
const now = isWindows ? 'rimraf' : 'rm -rf';
const data = fs.readFileSync(aliasPath).toString();
if (
  (isWindows && /rm\s\-rf/g.test(data)) ||
  (!isWindows && /rimraf/g.test(data))
) {
  const alisaJson = JSON.stringify(
    JSON.parse(data.replace(isWindows ? /rm\s\-rf/g : /rimraf/g, now)),
    null,
    2
  );
  fs.writeFile(aliasPath, alisaJson, (err) => {
    if (!err) {
      console.log(
        `${package.name} has replace "${before}" to "${now}" automatically!`
      );
    } else {
      console.warn(`${package.name} replace "${before}" to "${now}" fail!`);
    }
  });
}else{
  console.log(`skipped ${package.name} scripts postinstall!`)
}
