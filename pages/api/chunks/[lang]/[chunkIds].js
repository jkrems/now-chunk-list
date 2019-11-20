'use strict';

try {
  // From the current directory
  require('../../../../lib/touch-assets');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') throw e;
  try {
    // From the compiled directory
    require('../../../../../../../../lib/touch-assets');
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
  }
}
const dynamicBundle = require('next-dynamic-bundle');

module.exports = dynamicBundle.handler;
module.exports.config = dynamicBundle.handlerConfig;
