'use strict';

import * as actionTypes from './actionTypes'


function action(type, payload = {}) {
  return {type, ...payload}
}

export const ActionTypes = actionTypes;

export const updateRouterState = state => action(actionTypes.UPDATE_ROUTER_STATE, {state});
export const reportClickThrough = (ComponentName) => action(actionTypes.CLICK_THROUGH, {ComponentName});

export const updateResponsiveState = ({innerWidth, innerHeight, matchMedia} = {}) => action(actionTypes.RESPONSIVE_STATE, {
  innerWidth,
  innerHeight,
  matchMedia
});

export const feeds = {
  request: () => action(actionTypes.FETCH_FEEDS.REQUEST, {}),
  success: (response) => action(actionTypes.FETCH_FEEDS.SUCCESS, {response}),
  failure: (error) => action(actionTypes.FETCH_FEEDS.FAILURE, {error})
};

export const loadMoreFeeds = (pageCount)=> action(actionTypes.LOAD_MORE_FEEDS, {pageCount});
