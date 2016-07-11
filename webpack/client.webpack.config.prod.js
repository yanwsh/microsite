var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var baseConfig = require('./client.webpack.config.base');

var config = _.merge({},baseConfig);

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
      'NODE_ENV': '"production"',
      'RUN_ENV': '"client"'
  }
}));

config.module.loaders = config.module.loaders.concat([
    {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=../fonts/[name].[ext]"
    },
    {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=../fonts/[name].[ext]"
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=../fonts/[name].[ext]"
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=../fonts/[name].[ext]"
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=../fonts/[name].[ext]"
    },
    {
        test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192&name=../images/[name].[ext]'
    }
]);

module.exports = config;
