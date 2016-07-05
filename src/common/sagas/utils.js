'use strict';
import { take, put, call, fork, select } from 'redux-saga/effects';

export function* fetchEntity(entity, apiFn, pageCount) {
  yield put(entity.request());
  const {response, error} = yield call(apiFn, pageCount);
  if(response)
    yield put( entity.success(response) );
  else
    yield put( entity.failure(error) );
}
