'use strict';
var path = require('path');
var util = require('util');
var _ = require('lodash');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonConfig = require("./common.webpack.confg");

var config = require(commonConfig.resolve.alias["~config"]);

function generateSassData(config, depth) {
    var data = [];
    for (var k in config) {
        if (config.hasOwnProperty(k)) {
            var v = config[k];
            var name = (depth) ? depth + "-" + k : k;
            if (typeof v == "object") {
                data = data.concat(generateSassData(v, name));
            } else {
                data.push(util.format("$%s: %s;", name, v));
            }
        }
    }
    return data;
}

module.exports = _.merge({
    entry: {
        app: ['./src/client/index']
    },
    output: {
        path: path.join(__dirname, '../public/assets'),
        filename: '[name].bundle.js',
        publicPath: '/assets/'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        // new ExtractTextPlugin("../css/[name].bundle.css", {
        //   allChunks: true
        // })
        new ExtractTextPlugin("[name].bundle.css", {
            allChunks: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: path.resolve(__dirname, '..')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap&sourceComments")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", 'css-loader?sourceMap')
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=fonts/[name].[ext]"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192&name=images/[name].[ext]'
            }
        ]
    },
    sassLoader: {
        data: generateSassData({grid: config.siteConfig.grid}).join(" ")
    },
    postcss: function () {
        return {
            defaults: [autoprefixer]
        }
    }
}, commonConfig);
