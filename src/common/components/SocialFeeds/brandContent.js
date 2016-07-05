'use strict';

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { reduceTextLength } from './utils'

class brandContent extends Component{
  constructor(props){
    super(props);
    this.displayName = 'SocialFeeds__brandContent';
    this.handleClickThrough = this.handleClickThrough.bind(this);
  }

  handleClickThrough(){
    const { data } = this.props;
      window.open(data.link, '_blank');
  }

  render(){
    const { data, className, textMaxLength, cta } = this.props;
    var rootClass = classNames({
      'social-feeds__tile': true,
      'social-feeds__tile--brandContent': true
    }, className);

    return (
      <div className={rootClass} onClick={this.handleClickThrough}>
        <div className="social-feeds__tile--wrapper">
          <div className="social-feeds__tile--brandContent__image">
            <img src={data.image.url} />
          </div>
          <div className="social-feeds__tile--brandContent__bottom">
             <div className="social-feeds__tile--brandContent__bottom__title">{reduceTextLength(data.title, textMaxLength)}</div>
              <div className="social-feeds__tile--brandContent__bottom__cta">
                 <span className="social-feeds__tile--brandContent__bottom__cta__icon"><i className={cta.icon}></i></span>
                 <span className="social-feeds__tile--brandContent__bottom__cta__text">{ cta.text }</span>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

brandContent.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string
};

module.exports = brandContent;
