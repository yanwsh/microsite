'use strict';

import throttle from 'lodash/throttle'
import { updateResponsiveState } from '../actions'

//todo: remove this function

const throttleTime = 100;

export default (createStore) =>
  (...args) => {
    var store = createStore(...args);

    // if there is a `window`
    if (typeof window !== 'undefined') {
      // throttled event handler for window resize
      const throttledHandler = throttle(
        // just dispatch action to calculate responsive state
        () => store.dispatch(updateResponsiveState(window)),
        throttleTime
      );

      // add the resize event listener
      window.addEventListener('resize', throttledHandler)
    }

    // return the store so that the call is transparent
    return store
  }
