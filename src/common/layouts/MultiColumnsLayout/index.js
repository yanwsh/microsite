'use strict';

import React, { Component, PropTypes } from 'react'
import * as util from '../../containers/utils'

if(process.env.RUN_ENV !== "server"){
    require("./index.scss");
}

class MultiColumnsLayout extends Component{
    constructor(props){
        super(props);
        this.displayName = 'MultiColumnsLayout';
    }

    render() {
        const { columnNumber, children } = this.props;
        var key = 0;
        var columns = [];
        for(var i = 1; i <= columnNumber; i++){
            var column = this.props["column_" + i];
            if(column){
                columns.push(
                    <div className={column.className} key={i}>
                        {util.compile(column.content, key++)}
                    </div>
                )
            }
        }
        return (
            <div className="row">
                {columns}
                {children}
            </div>
        )
    }
}

export default MultiColumnsLayout;
