const { writeFileSync, readFileSync } = require('fs');
const { execSync } = require('child_process');
const { lookup } = require('./utils');

function main(packages = '') {
  if (!packages) throw Error('package/s arg must included');

  const npmrcFileDir = lookup('.npmrcFile');

  if (!npmrcFileDir) throw Error("couldn't locate .npmcrc file to update");

  const npmrcFile = readFileSync(npmrcFileDir);

  writeFileSync(
    npmrcFileDir,
    npmrcFile.replace('package-lock=true', getSetPackageLockParams(true))
  );

  execSync(`npm i ${packages}`);

  writeFileSync(
    npmrcFileDir,
    npmrcFile.replace(getSetPackageLockParams(false))
  );
}

const getSetPackageLockParams = (value) => {
  const buildParam = (val) => `package-lock=${val}`;
  return [buildParam(!value), buildParam(value)];
};

const [packages] = process.argv;
main(packages);
