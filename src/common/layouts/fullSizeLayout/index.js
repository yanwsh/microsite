'use strict';

import React, { Component, PropTypes } from 'react'

if(process.env.RUN_ENV !== "server"){
  require("./index.scss");
}

class fullSizeLayout extends Component{
  constructor(props){
    super(props);
    this.displayName = 'fullSizeLayout';
  }

  render() {
    const { children } = this.props;
    return (
      <div className="container-fluid">
        {children}
      </div>
    )
  }
}

export default fullSizeLayout;
