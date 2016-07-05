'use strict';

require('font-awesome/css/font-awesome.css');
require("./index.scss");

import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import { history } from '~common/services'
import routes from '~common/routes'
import Root from '~common/containers/Root'
import configureStore from '~common/store/configureStore'
import rootSaga from '~common/sagas'

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('root')
);
