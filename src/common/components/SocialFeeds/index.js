'use strict';

if(process.env.RUN_ENV !== "server") {
    require("./SocialFeeds.scss");
}
import { connect } from 'react-redux'
import SocialFeeds from './SocialFeeds'
import { getSocialFeeds } from '../../selectors'
import { loadMoreFeeds } from '../../actions'

const mapStateToProps = (state, props) => {
  const { pageCount } = props;
  return {
    feeds: getSocialFeeds(state, pageCount)
  }
};

export default connect(mapStateToProps, {
  loadMoreFeeds
})(SocialFeeds);
