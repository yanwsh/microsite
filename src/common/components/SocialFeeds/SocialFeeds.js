'use strict';

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import SocialFeeds__facebook from './facebook'
import SocialFeeds__twitter from './twitter'
import SocialFeeds__bc from './brandContent'

class SocialFeeds extends Component{
  constructor(props){
    super(props);
    this.displayName = 'SocialFeeds';
  }

  componentWillMount() {
    const { loadMoreFeeds, pageCount } = this.props;
    loadMoreFeeds(pageCount);
  }

  render(){
    var key = 0;
    const {options, feeds, pattern} = this.props;
    var rootClass = classNames({
      'social-feeds': true,
      'row': true,
    }, options.root.className);
    var tiles = [];
    if(feeds){
      var facebook_objs = (feeds.facebook && feeds.facebook.slice(0)) || [];
      var twitter_objs = (feeds.twitter && feeds.twitter.slice(0)) || [];
      var bc_objs = (feeds.bc_content && feeds.bc_content.slice(0)) || [];
      var totoal_length = facebook_objs.length + twitter_objs.length;
      var i = 0;
      while(totoal_length > 0){
        var c = pattern.charAt(i % pattern.length);
        var feed = null;
        var components = null;
        var tile_options = null;
        if(c == "F"){
          feed = facebook_objs.shift();
          if(feed){
            tile_options = options.facebook;
            components = SocialFeeds__facebook;
          }
        }
        if(c == "T"){
          feed = twitter_objs.shift();
          if(feed){
            tile_options = options.twitter;
            components = SocialFeeds__twitter;
          }
        }

        if(c == "B"){
          feed = bc_objs.shift();
          if(feed){
            tile_options = options.brandContent;
            components = SocialFeeds__bc;
          }
        }

        if(feed){
          var props = Object.assign(tile_options, {key: key++, data: feed});
          tiles.push(
            React.createElement(components, props, null)
          );
        }

        i++;
        totoal_length = facebook_objs.length + twitter_objs.length;
      }
    }

    // if(feeds){
    //   if(feeds.facebook){
    //     tiles = feeds.facebook.reduce(function (result, feed) {
    //       var props = Object.assign(options.facebook, {key: key++, data: feed});
    //       result.push(
    //         <SocialFeeds__facebook {...props} />
    //       );
    //       return result;
    //     }, tiles);
    //   }
    //   if(feeds.twitter){
    //     tiles = feeds.twitter.reduce(function (result, feed) {
    //       var props = Object.assign(options.twitter, {key: key++, data: feed});
    //       result.push(
    //         <SocialFeeds__twitter {...props} />
    //       );
    //       return result;
    //     }, tiles);
    //   }
    // }
    return (
      <div className={rootClass}>
        {tiles}
      </div>
    )
  }
}

SocialFeeds.propTypes = {
  feeds: PropTypes.object
};

module.exports = SocialFeeds;
