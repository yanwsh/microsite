'use strict';

import React, { Component, PropTypes } from 'react'

class Navbar extends Component{
  constructor(props){
    super(props);
    this.displayName = 'Navbar';
  }

  render(){
    const {leftComponent, rightComponent} = this.props;
    return (
      <nav className="navbar navbar-lg navbar-fixed-top navbar-with-logo navbar-green bg-black-shadow">
        <button type="button" className="navbar-toggler hidden-sm-up collapsed" data-toggle="collapse" data-target="#navbar-header" aria-expanded="false" aria-controls="navbar-header">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <div className="collapse navbar-toggleable-xs navbar-menu" id="navbar-header">
          {leftComponent}
          <ul className="nav navbar-nav">

          </ul>
        </div>
        <div className="navbar-right hidden-sm-down">
          {rightComponent}
        </div>
</nav>
    )
  }
}

module.exports = Navbar;
