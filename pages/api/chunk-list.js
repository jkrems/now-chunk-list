const fs = require('fs');
const path = require('path');

try {
  // From the current directory
  require('../../lib/touch-assets');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') throw e;
  try {
    // From the compiled directory
    require('../../../../../../lib/touch-assets');
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
  }
}

function loadChunks() {
  let buildId = 'development';
  try {
    buildId = fs.readFileSync(path.resolve('.next/BUILD_ID'), 'utf8');
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(path.resolve('.next/build-manifest.json'), 'utf8'));
  } catch (e) {
    manifest = e.message;
  }

  const chunkDir = path.resolve('.next/static/chunks');
  try {
    fs.statSync(chunkDir);
  } catch (e) {
    /* ignored */
  }
  let numberedChunks;
  try {
    numberedChunks = fs.readdirSync('.next/static/chunks').filter(filename => filename.endsWith('.js'));
  } catch (e) {
    numberedChunks = e.message;
  }

  let rootFiles;
  try {
    rootFiles = fs.readdirSync(process.cwd());
  } catch (e) {
    rootFiles = e.message;
  }

  let nextFiles;
  try {
    nextFiles = fs.readdirSync(path.join(process.cwd(), '.next'));
  } catch (e) {
    nextFiles = e.message;
  }

  let serverlessFiles;
  try {
    serverlessFiles = fs.readdirSync(path.join(process.cwd(), '.next', 'serverless'));
  } catch (e) {
    serverlessFiles = e.message;
  }

  return { buildId, manifest, chunkDir, numberedChunks, rootFiles, nextFiles, serverlessFiles };
}

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(loadChunks()));
};

export const config = {
  api: {
    bodyParser: false,
  },
};
