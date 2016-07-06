'use strict';

import expect from 'expect'
import * as actions from '../../../src/common/actions'
import * as actionTypes from '../../../src/common/actions/actionTypes'

describe('social feeds actions', ()=>{
    it('should create REQUEST action', ()=>{
        const expectedAction = {
            type: actionTypes.FETCH_FEEDS.REQUEST
        };
        expect(actions.feeds.request()).toEqual(expectedAction);
    });

    it('should create RESPONSE action', ()=>{
        const response = "RESPONSE MESSAGE";
        const expectedAction = {
            type: actionTypes.FETCH_FEEDS.SUCCESS,
            response: response
        };
        expect(actions.feeds.success(response)).toEqual(expectedAction);
    });

    it('should create FAILURE action', ()=>{
        const error = "ERROR MESSAGE";
        const expectedAction = {
            type: actionTypes.FETCH_FEEDS.FAILURE,
            error: error
        };
        expect(actions.feeds.failure(error)).toEqual(expectedAction);
    });
});
