'use strict';

import React, { Component, PropTypes } from 'react'

if(process.env.RUN_ENV !== "server"){
  require("./index.scss");
}

class boxedLayout extends Component{
  constructor(props){
    super(props);
    this.displayName = 'boxedLayout';
  }

  render() {
    const { children } = this.props;
    return (
      <div className="container">
        {children}
      </div>
    )
  }
}

export default boxedLayout;
