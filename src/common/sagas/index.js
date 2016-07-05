'use strict';

import { take, put, call, fork, select, cancelled } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'
import throttle from 'lodash/throttle'
import { updateResponsiveState } from '../actions'
import * as socialFeedsSaga from './socialFeeds'

const throttleTime = 100;

function responsiveState(){
  return eventChannel((emitter) => {
    // throttled event handler for window resize
    const throttledHandler = throttle(
      // just dispatch action to calculate responsive state
      () => emitter(window),
      throttleTime
    );

    throttledHandler();

    // add the resize event listener
    window.addEventListener('resize', throttledHandler);

    return () => {
      window.removeEventListener('resize', throttledHandler);
    }
  });
}

function* watchWindowResize() {
  if(typeof window !== "undefined"){
    yield put(updateResponsiveState(window));
    const chan = yield call(responsiveState);
    try{
      while(true){
        let data = yield take(chan);
        yield put(updateResponsiveState(data));
      }
    }finally {
      if(yield cancelled()){
        chan.close()
      }
    }
  }

}

export default function* root() {
  yield [
    call(watchWindowResize),
    call(socialFeedsSaga.watchLoadMoreFeeds)
  ]
}
