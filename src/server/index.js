'use strict';

process.env.RUN_ENV = "server";

require('babel-register');
require('./app');
