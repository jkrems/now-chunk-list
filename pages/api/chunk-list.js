import fs from 'fs';
import path from 'path';

function loadJSON(...segments) {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ...segments), 'utf8'));
}

function loadChunks() {
  let buildId = 'development';
  try {
    buildId = fs.readFileSync(path.resolve(process.cwd(), '.next', 'BUILD_ID'), 'utf8');
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  let manifest;
  try {
    manifest = loadJSON('.next', 'build-manifest.json');
  } catch (e) {
    manifest = e.message;
  }

  const chunkDir = path.resolve(process.cwd(), '.next', 'static', 'chunks');
  let numberedChunks;
  try {
    numberedChunks = fs.readdirSync(chunkDir).filter(filename => filename.endsWith('.js'));
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

  return { buildId, manifest, chunkDir, numberedChunks, rootFiles, nextFiles };
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
