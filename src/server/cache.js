'use strict';

import nodeCache from "node-cache"

var cache = new nodeCache({
  stdTTL: 1800
});

module.exports = cache;
