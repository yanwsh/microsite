'use strict';

var fs = require('fs');
var path = require('path');

const DEFAULT_PATH = '.';
const LOCAL_PATH = '../local';

function getConfigFile(file) {
  var currentPath = __dirname;
  var localconfigFile = path.resolve(currentPath, LOCAL_PATH, file);
  if(fs.existsSync(localconfigFile)){
    return require(localconfigFile);
  }
  var defaultconfigFile = path.resolve(currentPath, DEFAULT_PATH, file);
  return require(defaultconfigFile);
}

module.exports = {
  serverConfig: getConfigFile("./server.js"),
  siteConfig: getConfigFile("./site.js")
};
