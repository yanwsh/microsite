'use strict';

import * as actionTypes from '../../actions/actionTypes'
import object from 'lodash/object'

var merge = object.merge;

function paginate({types}) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }

  const [ requestType, successType, failureType ] = types;
  return (state = {
    isFetching: false,
    pageCount: 0,
    feeds: []
  }, action) => {
    switch (action.type) {
      case requestType:
            return merge({}, state, {
              isFetching: true
            });
            break;
      case successType:
            return merge({}, state, {
              isFetching: false,
              pageCount: state.pageCount + 1,
              feeds: [...state.feeds, action.response]
            });
            break;
      case failureType:
            return merge({}, state, {
              isFetching: false,
              error: action.error
            });
            break;
      default:
            return state;
    }
  };
}

var socialFeedsReducer = paginate({
  types: [
    actionTypes.FETCH_FEEDS.REQUEST,
    actionTypes.FETCH_FEEDS.SUCCESS,
    actionTypes.FETCH_FEEDS.FAILURE
  ]
});

export default socialFeedsReducer
