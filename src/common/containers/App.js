'use strict';
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateRouterState } from '../actions';
import { sitePageConfig } from '../index';
import * as util from './utils';

class App extends Component{
  updateRouter(props){
    let {location, routes, params} = props;
    let currentPath = location.pathname;
    this.props.updateRouterState({
      pathname: currentPath,
      params  : params
    });
    let currentRoute = routes.filter(route => route.path === currentPath);
    var name = currentRoute[0].name;
    this.setState({routerName: name});
  }

  componentWillMount() {
    this.updateRouter(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname !== nextProps.location.pathname)
      this.updateRouter(nextProps)
  }

  render(){
    const { children, location } = this.props;
    const pageConfig = sitePageConfig[this.state.routerName];
    var components = [];
    if(pageConfig){
      components = util.complieFromConfiguration(pageConfig.layout);
    }
    return (
      <div>
        {components}
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  updateRouterState: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

export default connect(null, {
  updateRouterState
})(App);
