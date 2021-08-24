const path = require('path');
const fs = require('fs');

function lookup({ file, dir = process.cwd(), debug }) {
  const p = path.join(dir, file);

  if (debug) console.log('lookup at', p);

  if (fs.existsSync(p)) return p;
  if (!dir) return debug && console.log("lookup couldn't find", file);

  const newDir = dir.split(path.sep);
  newDir.pop();

  return lookup({ file, dir: newDir.join(path.sep), debug });
}

module.exports = { lookup };
