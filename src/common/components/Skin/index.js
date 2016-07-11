'use strict';

if(process.env.RUN_ENV !== "server") {
    require("./Skin.scss");
}

import { connect } from 'react-redux'
import Skin from './Skin'
import { reportClickThrough } from '../../actions'

function mapStateToProps(state, ownProps) {
  return {
    responsiveState: state.common.responsiveState
  }
}

export default connect(mapStateToProps, {
  reportClickThrough
})(Skin);
