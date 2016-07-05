'use strict';

var path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const localConfigPath = path.resolve(projectRoot, 'local');
const globalConfigPath = path.resolve(projectRoot, 'config');
const commonPath = path.resolve(projectRoot, 'src/common');
const webpackPath = path.resolve(projectRoot, 'webpack');

module.exports = {
  context: path.resolve(__dirname, '..'),
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',
  resolve: {
    alias: {
      '~root': projectRoot,  
      '~config': globalConfigPath,
      '~local': localConfigPath,
      '~common': commonPath,
      '~webpack': webpackPath
    }
  }
};
