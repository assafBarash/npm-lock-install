const path = require('path');
const fs = require('fs');

function lookup(file, dir = process.cwd()) {
  const p = path.join(dir, file);

  if (fs.existsSync(p)) return p;
  if (!dir) return console.log('config not found');

  const newDir = dir.split(path.sep);
  newDir.pop();

  return lookup(file, newDir.join(path.sep));
}

module.exports = { lookup };
