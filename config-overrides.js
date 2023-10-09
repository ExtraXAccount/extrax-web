const webpack = require('webpack');
const path = require('path');
// config-overrides.js
module.exports = function override(config, env) {
  config.resolve.fallback = {
    fs: false,
    os: false,
    path: false,
    // stream: require.resolve("stream-browserify"),
    buffer: require.resolve('buffer/'),
    // crypto: require.resolve("crypto-browserify"),
  };

  config.resolve.alias = {
    '@': path.resolve(__dirname, 'src/'),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], 
    })
  )
  return config
}