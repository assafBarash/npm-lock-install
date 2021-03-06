const { writeFileSync, readFileSync } = require('fs');
const { execSync } = require('child_process');
const { lookup } = require('./utils');

function main(packages = '', { debug }) {
  if (debug) console.log('cwd', process.cwd());
  if (!packages) throw Error('package/s arg must be included');

  const npmrcFileDir = lookup({ file: '.npmrc', debug });

  if (!npmrcFileDir) throw Error("couldn't locate .npmrc file to update");

  const npmrcFile = readFileSync(npmrcFileDir).toString();

  writeFileSync(npmrcFileDir, npmrcFile.replace(getSetPackageLockParams(true)));

  execSync(`npm i ${packages.join(' ')}`);

  writeFileSync(
    npmrcFileDir,
    npmrcFile.replace(getSetPackageLockParams(false))
  );
}

const getSetPackageLockParams = (value) => {
  const buildParam = (val) => `package-lock=${val}`;
  return [buildParam(!value), buildParam(value)];
};

module.exports = main;
