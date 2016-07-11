'use strict';

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class Gallery extends Component{
    constructor(props){
        super(props);
        this.displayName = 'Gallery';
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        var element = this.refs.slider;
        require.ensure(["jquery", "slick-carousel"], (require) => {
            var $ = require("jquery");
            var slick = require("slick-carousel");
            $(element).slick({
                arrows: false,
                dots: true,
            });
        });
    }

    componentWillUnmount() {
        var element = this.refs.slider;
        require.ensure(["jquery", "slick-carousel"], (require) => {
            var $ = require("jquery");
            var slick = require("slick-carousel");
            $(element).slick('unslick');
        });
    }

    handlePrevClick(){
        var element = this.refs.slider;
        require.ensure(["jquery", "slick-carousel"], (require) => {
            var $ = require("jquery");
            $(element).slick('slickPrev');
        });
    }

    handleNextClick(){
        var element = this.refs.slider;
        require.ensure(["jquery", "slick-carousel"], (require) => {
            var $ = require("jquery");
            $(element).slick('slickNext');
        });
    }

    render(){
        var key = 0;
        const { className, images } = this.props;
        var rootClass = classNames({
            'gallery': true
        }, className);
        var slides = images.map((image)=>{
            var skey = 0;
            var source = image.links.map((link)=>{
               return (
                   <source media={link.media} srcSet={link.srcset} key={skey++} />
               )
            });
            return (
                <div className="gallery__slide" key={key++}>
                    <picture key={key++}>
                        {source}
                        <img className="gallery__slide__image" alt="slider" key={key++} />
                    </picture>
                </div>
            )
        });
        return (
            <div className="row">
                <div className={rootClass}>
                    <div className="gallery__wrapper">
                        <div className="gallery__container">
                            <div className="gallery__icon gallery__icon--prev" onClick={this.handlePrevClick}><i className="fa fa-chevron-left" aria-hidden="true"></i></div>
                            <div className="gallery__icon gallery__icon--next" onClick={this.handleNextClick}><i className="fa fa-chevron-right" aria-hidden="true"></i></div>
                            <div className="gallery__slider" ref="slider">
                                { slides }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Gallery;
