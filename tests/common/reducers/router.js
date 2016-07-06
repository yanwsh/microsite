'use strict';

import expect from 'expect'
import reducers from '../../../src/common/reducers'
import * as actionTypes from '../../../src/common/actions/actionTypes'

describe('router reducer testing', ()=>{
   it('should return intial state', ()=>{
       expect(
           reducers(undefined, {}).router
       )
       .toEqual({
           pathname: '/'
       });
   });

    it('should update new router state', ()=>{
        expect(
            reducers(undefined, {
                type: actionTypes.UPDATE_ROUTER_STATE,
                state: {
                    pathname: '/testPath'
                }
            }).router
        ).toEqual({
            pathname: '/testPath'
        });
    });
});
