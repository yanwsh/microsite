'use strict';

if(process.env.RUN_ENV === "server"){
    module.exports = require('./utils.server')
}else{
    module.exports = require('./utils.client')
}
