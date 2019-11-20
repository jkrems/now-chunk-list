'use strict';

const fs = require('fs');
const path = require('path');

try {
  fs.statSync(path.resolve('.next/static'));
} catch (e) {}

try {
  fs.statSync(path.resolve('.next/build-manifest.json'));
} catch (e) {}

try {
  fs.statSync(path.resolve('.next/BUILD_ID'));
} catch (e) {}
