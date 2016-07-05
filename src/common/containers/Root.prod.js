'use strict';
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, RouterContext } from 'react-router'

class Root extends Component {
  render() {
    const { store, history, routes, type, renderProps } = this.props

    return (
      <Provider store={store}>
        <div>
          { type === 'server'
            ? <RouterContext {...renderProps} />
            : <Router history={history} routes={routes} />
          }
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.node.isRequired
};

export default Root;
