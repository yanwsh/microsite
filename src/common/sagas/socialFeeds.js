'use strict';

import { take, put, call, fork, select, cancelled } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { feeds } from '../actions';
import { socialFeeds} from '../services'
import {fetchEntity} from './utils';
import { getSocialFeeds } from '../selectors';

export const fetchFeeds = fetchEntity.bind(null, feeds, socialFeeds.fecthFeeds);

function* loadFeeds(pageCount) {
  const feeds = yield select(getSocialFeeds, pageCount);
  if(!feeds){
    yield call(fetchFeeds, pageCount);
  }
}

export function* watchLoadMoreFeeds() {
  while(true){
    const {pageCount} = yield take(actionTypes.LOAD_MORE_FEEDS);
    yield fork(loadFeeds, pageCount);
  }
}
