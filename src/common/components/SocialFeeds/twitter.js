'use strict';

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { parseTwitterDate, reduceTextLength, replaceHTMLEntity, getTwitterURL } from './utils'

class twitter extends Component{
  constructor(props){
    super(props);
    this.displayName = 'SocialFeeds__twitter';
    this.handleClickThrough = this.handleClickThrough.bind(this);
  }

  componentWillMount(){
    const {data} = this.props;
    this.setState({ time: "" });
    parseTwitterDate(data.created_at, (timer)=>{
      if(typeof timer == "object") timer = timer.format('MMMM D, YYYY [at] H:mm');
      this.setState({ time: timer });
    });
  }

  handleClickThrough(){
    const { data } = this.props;
    window.open(getTwitterURL(data.id_str, data.user.screen_name), '_blank');
  }

  render(){
    const { data, className, textMaxLength } = this.props;
    var rootClass = classNames({
      'social-feeds__tile': true,
      'social-feeds__tile--twitter': true
    }, className);
    return (
      <div className={rootClass} onClick={this.handleClickThrough}>
        <div className="social-feeds__tile--wrapper">
          <div className="social-feeds__tile-content">
            <div className="social-feeds__tile-content__top">
              <div className="social-feeds__tile-content__top__left-icon">
                <img src={data.user.profile_image_url} />
              </div>
              <div className="social-feeds__tile-content__top__right-title">
                <div className="social-feeds__tile-content__top__right-title__top">{data.user.name}</div>
                <div className="social-feeds__tile-content__top__right-title__bottom">@{data.user.screen_name}</div>
              </div>
            </div>
            <div className="social-feeds__tile-content__text">{ replaceHTMLEntity(reduceTextLength(data.text, textMaxLength)) }</div>
          </div>
          <div className="social-feeds__tile-date">
            { this.state.time }
          </div>
          <div className="social-feeds__tile-logo"><i className="fa fa-twitter"></i></div>
        </div>
      </div>
    );
  }
}

module.exports = twitter;
