'use strict';
var path = require("path");

module.exports = {
  entry:{
    lib: ['babel-polyfill', 'react', 'react-dom', 'react-router', 'redux-logger', 'redux-saga']
  },
  output: {
    path: path.join(__dirname, "../public/js"),
    filename: "[name].bundle.js",
    library: "[name]"
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  }
};
