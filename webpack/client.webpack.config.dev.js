var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var baseConfig = require('./client.webpack.config.base');

var config = _.merge({},baseConfig);

config.entry.app.unshift("webpack-hot-middleware/client");
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
      'NODE_ENV': '"development"',
      'RUN_ENV': '"client"'
  }
}));

module.exports = config;
