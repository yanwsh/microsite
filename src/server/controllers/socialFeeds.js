'use strict';

import express from 'express'
import socialFeedsConfig from '~config/socialFeeds'
import {Facebook} from 'fb'
import cache from '../cache'
import { Twitter } from 'twitter-node-client'
import async from 'async';
import _ from 'lodash';
import request from 'request';

const router = express.Router();

function decStrNum (n) {
  n = n.toString();
  var result=n;
  var i=n.length-1;
  while (i>-1) {
    if (n[i]==="0") {
      result=result.substring(0,i)+"9"+result.substring(i+1);
      i --;
    }
    else {
      result=result.substring(0,i)+(parseInt(n[i],10)-1).toString()+result.substring(i+1);
      return result;
    }
  }
  return result;
}

function bc_api(page_number) {
  return (callback)=>{
    //branded content only have one page
    if(page_number > 1) {callback(null, []); return;}
    var d = cache.get(`socialFeeds/bc` );
    if(d) {
      callback(null, d);
      return;
    }
    request(socialFeedsConfig.BrandContentLink, (error, response, body)=>{
       if(error){
         callback(error, null);
         return;
       }
      if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        cache.set( `socialFeeds/bc`, data.articles );
        callback(null, data.articles);
      }
    });
  };
}

function twitter_api(page_number){
  var twitter = new Twitter({
    "consumerKey": socialFeedsConfig.twitter.consumerKey,
    "consumerSecret": socialFeedsConfig.twitter.consumerSecret,
    "accessToken": socialFeedsConfig.twitter.accessToken,
    "accessTokenSecret": socialFeedsConfig.twitter.accessTokenSecret,
    "callBackUrl": socialFeedsConfig.twitter.callBackUrl
  });
  var max_id = null;
  var config = { user_id: socialFeedsConfig.twitter.user_id, count: socialFeedsConfig.twitter.number_per_request * 1.5, exclude_replies: true};
  if(page_number > 1){
    var prev_content = cache.get("socialFeeds/twitter_" + (page_number - 1));
    if(prev_content){
      var last_element = _.last(prev_content);
      max_id = last_element.id_str;
    }else{
      page_number = 1;
    }
  }

  if(max_id){
    config = Object.assign({}, config, {
      max_id: decStrNum(max_id)
    });
  }
  return (callback)=>{
    var d = cache.get(`socialFeeds/twitter_${page_number}` );
    if(d) {
      callback(null, d);
      return;
    }
    twitter.getCustomApiCall('/statuses/user_timeline.json',config,
      (error)=>{
        callback(error, null);
      }, (response)=>{
        var data = JSON.parse(response);
        var drop_number = data.length - socialFeedsConfig.twitter.number_per_request;
        if(drop_number < 0) drop_number = 0;
        data = _.dropRight(data, drop_number);
        cache.set( `socialFeeds/twitter_${page_number}`, data );
        callback(null, data);
      });
  };
}

function facebook_api(page_number) {
  var fb = new Facebook({
    appId: socialFeedsConfig.facebook.app_id,
    appSecret: socialFeedsConfig.facebook.app_secret,
    version: socialFeedsConfig.facebook.graph_version,
    accessToken: socialFeedsConfig.facebook.app_id + '|' + socialFeedsConfig.facebook.app_secret
  });
  var query = 'limit=' + socialFeedsConfig.facebook.number_per_request;

  if(page_number > 1){
    var prev_content = cache.get("socialFeeds/facebook_" + (page_number - 1));
    if(prev_content){
      //condition 1: exist previous page_number
      query += "&next=" + prev_content.paging.next;
    }else{
      //condition 2: not exists
      query += "&offset=" + (page_number - 1);
    }
  }

  return (callback)=>{
    var d = cache.get(`socialFeeds/facebook_${page_number}`);
    if(d){
      callback(null, d.data);
      return;
    }
    fb.api(`/${socialFeedsConfig.facebook.screen_name}/posts?${query}`, 'get',(response) => {
      if(!response || response.error){
        callback(response.error, null);
      }else{
        cache.set( `socialFeeds/facebook_${page_number}`, response );
        callback(null, response.data);
      }
    });
  }
}

router.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  var page_number = (req.query.page && parseInt(req.query.page)) || 1;
  var tasks = {};
  if(socialFeedsConfig.EnableFacebook){
    tasks['facebook'] = facebook_api(page_number);
  }
  if(socialFeedsConfig.EnableTwitter){
    tasks['twitter'] = twitter_api(page_number);
  }
  if(socialFeedsConfig.EnableBrandContent){
    tasks['bc_content'] = bc_api(page_number);
  }
  async.parallel(tasks, (err, results)=>{
    if(err){
        res.status(500).json({
          error: err
        });
        return;
    }
    res
      .json(results);
  });
});

export default router;
