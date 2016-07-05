'use strict';

export const getSocialFeeds = (state, pageCount) => {
  const count = pageCount || getSocialPageCount(state);
  return (state.socialFeeds.feeds.length > 0)? state.socialFeeds.feeds[count - 1]: null;
};

export const getSocialPageCount = (state) => {
  return state.socialFeeds.pageCount;
};
