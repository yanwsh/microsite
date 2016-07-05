'use strict';

require('babel-register');
var gulp = require('gulp');
var gutil = require("gulp-util");
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var config = require('./config');
var webpack = require('webpack');
var webpack_server_config = require('./webpack/server.webpack.config.base');
const ENV = process.env.NODE_ENV = process.env.ENV = config.serverConfig.env;

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    files: ["src/client/*.*", "src/common/**/*.scss"],
    proxy: config.serverConfig.domain + ":" + config.serverConfig.port,
    port: 8000,
    notify: true
  });
});

gulp.task('nodemon', ['build-backend'], function (cb) {
  var called = false;

  return nodemon({
    script: './dist/server.bundle.js',
    watch: ['./src/server/', './src/common/', './config/']
  })
  .on('start', function onStart() {
      if(!called){
        setTimeout(function () {
          cb();
        }, 2000);
      }
      called = true;
  })
  .on('restart', function () {
    webpack(webpack_server_config).run(onBuild('build-backend', false, function () {
      setTimeout(function () {
        browserSync.reload({stream: false});
      }, 1000);
    }));
  });
});

function onBuild(taskname, isWatch, done) {
  return function (err, stats) {
    if(err) throw new gutil.PluginError(taskname, err);
    gutil.log(taskname, stats.toString({
      colors: true
    }));
    if(isWatch){
      nodemon.restart();
    }
    if(done) {
      done();
    }
  }
}

gulp.task('build-backend', function(done){
  webpack(webpack_server_config).run(onBuild('build-backend', false, done));
});

//todo: make backend watch working.
gulp.task('backend-watch', function() {
  webpack(webpack_server_config).watch(100, onBuild('backend-watch', true));
});

//fix nodemon still running problem.
function exitHandler() { process.exit(0); }
process.once('SIGINT', exitHandler);
