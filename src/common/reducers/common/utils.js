'use strict';

import transform from 'lodash/transform'
import reduce from 'lodash/reduce'

/**
 * Gets the current media type from the global `window`.
 * @arg {object} mediaQueries - The media queries object.
 * @returns {string} The window's current media type.  This is the key of the
 * breakpoint that is the next breakpoint larger than the window.
 */
function getMediaType(matchMedia, mediaQueries, defaultMediaType) {
  if(typeof matchMedia === "undefined"){
    return defaultMediaType
  }

  return reduce(mediaQueries, (result, query, type) =>{
    return matchMedia(query).matches ? type : result
  }, defaultMediaType);
}

/**
 * Compute the `lessThan` object based on the browser width.
 * @arg {number} browserWidth - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @returns {object} The `lessThan` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is less than the breakpoint.
 */
function getLessThan(browserWidth, breakpoints, currentMediaType) {
  return transform(breakpoints, (result, breakpoint, mediaType) => {
    // if the breakpoint is a number
    if (typeof breakpoint === 'number') {
      // store wether or not it is less than the breakpoint
      result[mediaType] = browserWidth < breakpoint && mediaType !== currentMediaType;
      // handle non numerical breakpoints specially
    } else {
      result[mediaType] = false
    }
  })
}


/**
 * Compute the `greaterThan` object based on the browser width.
 * @arg {number} browserWidth - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @returns {object} The `greaterThan` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is greater than the breakpoint.
 */
function getGreaterThan(browserWidth, breakpoints) {
  return transform(breakpoints, (result, breakpoint, mediaType) => {
    // if the breakpoint is a number
    if (typeof breakpoint === 'number') {
      // store wether or not it is greater than the breakpoint
      result[mediaType] = browserWidth > breakpoint
    } else {
      result[mediaType] = false
    }
  })
}

export default {
  getMediaType,
  getGreaterThan,
  getLessThan
}
