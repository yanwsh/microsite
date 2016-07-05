'use strict';

import { combineReducers } from 'redux';
import MediaQuery from 'mediaquery';
import * as ActionTypes from '../../actions/actionTypes';
import siteConfig from '../../../../config/site';
import util from './utils';

function clickthrough(state = {}, action) {
  switch (action.type) {
    case ActionTypes.CLICK_THROUGH:
      return Object.assign({}, state, {
         lastClickedComponent: action.ComponentName
      });
    default:
      return state
  }
}

const defaultMediaType = 'infinity';
const defaultOrientation = null;
const breakpoints = siteConfig.grid.breakpoints;
const mediaQueries = MediaQuery.asObject(breakpoints);
const mediaOrientationQueries = {
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)'
};

function responsiveState(state = {
  width: 0,
  height: 0,
  lessThan: {},
  greaterThan: {},
  mediaType: null,
  orientation: null
}, action) {
  if(action.type == ActionTypes.RESPONSIVE_STATE){
    const {innerWidth, innerHeight, matchMedia} =  action;
    const mediaType = util.getMediaType(matchMedia, mediaQueries, defaultMediaType);
    const orientation = util.getMediaType(matchMedia, mediaOrientationQueries, defaultOrientation);

    return {
      width: innerWidth,
      height: innerHeight,
      lessThan: util.getLessThan(innerWidth, breakpoints, mediaType),
      greaterThan: util.getGreaterThan(innerWidth, breakpoints),
      mediaType,
      orientation,
    }
  }
  return state;
}

const pageReducer = combineReducers({
  clickthrough,
  responsiveState
});

export default pageReducer
