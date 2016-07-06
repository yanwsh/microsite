'use strict';

import React, { Component, PropTypes } from 'react'

class Skin extends Component{
  constructor(props){
    super(props);
    this.displayName = 'Skin';
    this.handleClickthrough = this.handleClickthrough.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleClickthrough() {
    const { clickThrough, reportClickThrough} = this.props;
    window.open(clickThrough, "_blank");
    reportClickThrough(this.displayName);
  }

  render() {
    const { responsiveState } = this.props;
    if(responsiveState.greaterThan.lg){
      return (
        <div className="Skin">
          <div className="Skin--left">
            <div className="Skin--left__creative" onClick={this.handleClickthrough}>
              <img src={this.props.leftImageURL} alt="" />
            </div>
          </div>

          <div className="Skin--right">
            <div className="Skin--right__creative"  onClick={this.handleClickthrough}>
              <img src={this.props.rightImageURL} alt="" />
            </div>
          </div>
        </div>
      );
    }
    return false;
  }
}

Skin.propTypes = {
    // Injected by React Redux
    leftImageURL: PropTypes.string,
    rightImageURL: PropTypes.string,
    clickThrough: PropTypes.string,
    reportClickThrough: PropTypes.func.isRequired,
    responsiveState: PropTypes.object
};

module.exports = Skin;
