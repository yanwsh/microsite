'use strict';

import { connect } from 'react-redux'
import Gallery from './Gallery'

if(process.env.RUN_ENV !== "server") {
    require("./Gallery.scss");
    require("picturefill");
}

export default connect(null, null)(Gallery);
