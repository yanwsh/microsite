'use strict';
var path = require('path');
var fs   = require('fs');
var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonConfig = require("./common.webpack.confg");

module.exports = _.merge({}, commonConfig, {
  devtool: "source-map",
  entry: {
    server: ['./src/server/index']
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  target: 'node',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    //new webpack.IgnorePlugin(/\.(css|less|scss)$/),
    new webpack.NormalModuleReplacementPlugin(/\.(css|less|scss)$/, 'node-noop')
  ],
  // keep node_modules paths out of the bundle
  externals: [fs.readdirSync(path.resolve(__dirname, '..', 'node_modules'))
    .reduce(function(ext, mod){
      const modExt = ext;
      modExt[mod] = 'commonjs ' + mod;
      return modExt;
    },
    /**
     * Workaround for enzyme react testing lib conditional requires
     * @see: https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
     */
    {
      cheerio: true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
      'react/addons': true,
      mocha: true,
      chai: true,
      enzyme: true,
      'mock-require': true,
      proxyquire: true
    }
  ), {
    "~webpack/client.webpack.config.dev": "commonjs ../webpack/client.webpack.config.dev",
    "~config": "commonjs ../config"
  }
  ],
  module:{
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '..')
      }
    ]
  }
});
