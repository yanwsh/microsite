'use strict';

import { combineReducers } from 'redux';
import { ActionTypes } from '../actions';
import common  from './common';
import socialFeeds from './socialFeeds';

function router(state = { pathname: '/' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return Object.assign({}, state, action.state);
    default:
      return state
  }
}

const rootReducer = combineReducers({
  router,
  common,
  socialFeeds
});

export default rootReducer
