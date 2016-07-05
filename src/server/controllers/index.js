'use strict';
import express from 'express'
import socialFeeds from './socialFeeds'

const router = express.Router({
  strict: true
});

router.use('/socialFeeds', socialFeeds);

export default router;
