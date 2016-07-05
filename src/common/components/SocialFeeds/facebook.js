'use strict';

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { parseFacebookDate, getFacebookPostURL, reduceTextLength, replaceHTMLEntity } from './utils'

class facebook extends Component{
  constructor(props){
    super(props);
    this.displayName = 'SocialFeeds__facebook';
    this.handleClickThrough = this.handleClickThrough.bind(this);
  }

  componentWillMount(){
    const {data} = this.props;
    this.setState({ time: "" });
    parseFacebookDate(data.created_time, (timer)=>{
      if(typeof timer == "object") timer = timer.format('MMMM D, YYYY [at] H:mm');
      this.setState({ time: timer });
    });
  }

  handleClickThrough(){
    const { data } = this.props;
    window.open(getFacebookPostURL(data.id), '_blank');
  }

  render(){
    const { data, className, textMaxLength } = this.props;
    var rootClass = classNames({
      'social-feeds__tile': true,
      'social-feeds__tile--facebook': true
    }, className);
    return (
      <div className={rootClass} onClick={this.handleClickThrough}>
        <div className="social-feeds__tile--wrapper">
          <div className="social-feeds__tile-content">
            { replaceHTMLEntity(reduceTextLength(data.message, textMaxLength)) }
          </div>
          <div className="social-feeds__tile-date">
            { this.state.time }
          </div>
          <div className="social-feeds__tile-logo"><i className="fa fa-facebook"></i></div>
        </div>
      </div>
    )
  }
}

facebook.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string
};

module.exports = facebook;
