'use strict';

import fetch from 'isomorphic-fetch'
import { serverConfig } from '../index'

function callApi(endpoint) {
  const fullUrl = endpoint;
  return fetch(fullUrl)
    .then( (response) => {
      return response.json().then( json => ({ json, response}))
    }).then(({json, response}) => {
       if(!response.ok){
         return Promise.reject(json);
       }
        return json
    }).then(
      (json)=> ({response: json}),
      (error) => ({error: error.message || 'Something bad happened'})
    )
}

function getApiUrl() {
  return 'http://' + serverConfig.domain + ':' + serverConfig.port;
}

const api_url = getApiUrl();

export const fecthFeeds = (pageCount) => {
  var url = '/api/socialFeeds';
  if(pageCount){
    url += '?page=' + pageCount;
  }
  return callApi(api_url + url);
};


