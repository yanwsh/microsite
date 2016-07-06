'use strict';

import expect from 'expect'
import * as actions from '../../../src/common/actions'
import * as actionTypes from '../../../src/common/actions/actionTypes'

describe('basic actions', ()=>{
   it('should report an action to click through', ()=>{
       const component_name = "test_component";
       const expectedAction = {
           type: actionTypes.CLICK_THROUGH,
           ComponentName: component_name
       };
       expect(actions.reportClickThrough(component_name)).toEqual(expectedAction);
   })
});
