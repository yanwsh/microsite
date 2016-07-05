'use strict';

require("./SocialFeeds.scss");
import { connect } from 'react-redux'
import SocialFeeds from './SocialFeeds'
import { getSocialFeeds } from '~common/selectors'
import { loadMoreFeeds } from '~common/actions'

const mapStateToProps = (state, props) => {
  const { pageCount } = props;
  return {
    feeds: getSocialFeeds(state, pageCount)
  }
};

export default connect(mapStateToProps, {
  loadMoreFeeds
})(SocialFeeds);
