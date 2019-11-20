'use strict';

const {withDynamicBundle} = require('next-dynamic-bundle');

/**
 * For type checking/completion purposes only. An `Object.assign` that forwards
 * the type of the first argument to the following arguments.
 *
 * @template T
 * @param {T} target
 * @param {T} overrides
 * @returns {T}
 */
function merge(target, overrides) {
  return Object.assign(target, overrides);
}

module.exports = withDynamicBundle({prefix: '/api/chunks'})({
  // target: 'serverless',
  experimental: {
    granularChunks: true,
  },

  /**
   * @param {import('webpack').Configuration} config
   * @param {*} context
   */
  webpack(config, { isServer, dev /*, webpack */ }) {
    if (isServer) {
      config.externals = [
        function(context, request, callback) {
          if (/\.\.\/lib\/touch-assets$/.test(request)) {
            return callback(null, 'commonjs ' + request);
          }
          callback();
        },
      ].concat(config.externals);
      return config;
    }

    if (dev) return config;

    merge(config.optimization.splitChunks, {
      // Disable built-in next.js cache groups (e.g. commons)
      cacheGroups: {
        default: {
          chunks: 'all',
          minSize: 1,
          name: false,
          maxAsyncRequests: 100000,
          // TODO: Things start breaking once this goes over 5 which smells
          // like a fundamental issue is hiding behind this symptom.
          maxInitialRequests: 5,
          reuseExistingChunk: true,
          enforce: true,
        },
        vendors: false,
      },
    });

    return config;
  },
});
