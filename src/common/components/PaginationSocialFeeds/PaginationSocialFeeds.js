'use strict';

import React, { Component, PropTypes } from 'react'
import SocialFeeds from '../SocialFeeds'
import Inview from '../Inview'

class PaginationSocialFeeds extends Component{
  constructor(props){
    super(props);
    this.displayName = 'PaginationSocialFeeds';
    this.handleloadMore = this.handleloadMore.bind(this);
  }

  componentWillMount(){
    this.setState({pageCount: 1});
  }

  handleloadMore(){
    const {totalNumber} = this.props;
    if(totalNumber == -1 || totalNumber > this.state.pageCount){
      this.setState({pageCount: this.state.pageCount + 1});
    }
  }

  render(){
    const { child, totalNumber, autoLoading } = this.props;
    var key = 0;
    var pages = [];
    for(var i = 1; i <= this.state.pageCount; i++){
      var props = Object.assign(child, {key: key++, pageCount: i});
      pages.push(
        <SocialFeeds {...props} />
      )
    }
    var button, inview;
    if(totalNumber > this.state.pageCount){
      if(autoLoading > this.state.pageCount){
        inview = (
          <Inview onInview={this.handleloadMore} />
        );
      }
      button = (
        <button onClick={this.handleloadMore}>
          Load More
        </button>
      );
    }
    return (
      <div>
        { pages  }
        { inview }
        { button }
      </div>
    )
  }
}

module.exports = PaginationSocialFeeds;
