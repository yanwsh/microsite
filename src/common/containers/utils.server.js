'use strict';

import React, { Component, PropTypes } from 'react'
var path = require('path');

export function compile(config, key) {
    if(config.type == "layouts"){
        return renderLayout(config, key);
    }else if(config.type == "components"){
        return renderComponents(config, key);
    }else if(config.type == "sections"){
        return renderSections(config, key);
    }
    throw new Error(`config type ${config.type} is not known`)
}

function renderSections(config, key) {
    var section = require(path.resolve(__dirname, `../../../config/sections/${config.name}/index.js`)).default;
    var props = Object.assign({}, config.props || {}, {
        key: key
    });
    var children = null;
    if(config.children){
        let child_key = 0;
        children = config.children.map((child)=>{
            return compile(child, child_key++);
        });
    }
    return React.createElement(section, props, children);
}

function renderComponents(config, key) {
    var component = require(path.resolve(__dirname, `../components/${config.name}/index.js`)).default;
    var props = Object.assign({}, config.props || {}, {
        key: key
    });
    var children = null;
    if(config.children){
        let child_key = 0;
        children = config.children.map((child)=>{
            return compile(child, child_key++);
        });
    }
    return React.createElement(component, props, children);
}

function renderLayout(config, key) {
    var layout = require(path.resolve(__dirname, `../layouts/${config.name}/index.js`)).default;
    var props = Object.assign({}, config.props || {}, {
        key: key
    });
    var children = null;
    if(config.children){
        let child_key = 0;
        children = config.children.map((child)=>{
            return compile(child, child_key++);
        });
    }
    return React.createElement(layout, props, children);
}

export const complieFromConfiguration = (config) => {
    var components = [];
    let key = 0;
    for( var k in config){
        if(config.hasOwnProperty(k)){
            var v = config[k];
            components.push(compile(v, key++));
        }
    }
    return components;
};
