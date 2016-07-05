'use strict';

import React, { Component, PropTypes } from 'react'
import ReactDOM from "react-dom"

class Inview extends Component{
  constructor(props){
    super(props);
    this.displayName = 'Inview';
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    this.active = true;
    require.ensure(["jquery", "jquery-inview"], (require) => {
      var $ = require("jquery");
      var inview = require("jquery-inview");
      $(element).on("inview", () => {
        if (this.active) {
          this.active = false;
          this.props.onInview.apply(this.props.onInview, arguments);
        }
      });
    });

  }

  componentDidUpdate() {
    this.active = true;
    require.ensure(["jquery", "jquery-inview"], (require) => {
      var $ = require("jquery");
      var inview = require("jquery-inview");
      setTimeout($.inviewCheck, 100);
    });

  }

  componentWillUnmount() {
    const element = ReactDOM.findDOMNode(this);
    require.ensure(["jquery", "jquery-inview"], (require) => {
      var $ = require("jquery");
      var inview = require("jquery-inview");
      $(element).off("inview");
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

module.exports = Inview;
