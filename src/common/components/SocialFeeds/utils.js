'use strict';

function getMessage(system_date, user_date){
  var diff = Math.floor((user_date.diff(system_date)) / 1000);
  if (diff <= 1) {return "just now";}
  if (diff < 20) {return diff + " seconds ago";}
  if (diff < 40) {return "half a minute ago";}
  if (diff < 60) {return "less than a minute ago";}
  if (diff <= 90) {return "one minute ago";}
  if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
  if (diff <= 5400) {return "1 hour ago";}
  if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
  if (diff <= 129600) {return "1 day ago";}
  if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
  if (diff <= 777600) {return "1 week ago";}
  return system_date;
}

function parseTwitterDate(tdate, cb) {
  require.ensure('moment', (require) => {
    var moment = require("moment");
    var system_date = new moment(tdate, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
    var user_date = new moment();
    cb(getMessage(system_date, user_date));
  });
}

function parseFacebookDate(tdate, cb){
  require.ensure('moment', (require) => {
    var moment = require("moment");
    var system_date = new moment(tdate, "YYYY-MM-DD hh:mm Z");
    var user_date = new moment();
    cb(getMessage(system_date, user_date));
  });
}

function reduceTextLength(text, length = 100) {
  return (text.length > length) ?
     text.substring(0, length) + "..." :
    text;
}

function replaceHTMLEntity(text) {
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  return text;
}

function getFacebookPostURL(id){
  var vals = id.split("_");
  if(vals.length == 2){
    return `http://www.facebook.com/${vals[0]}/posts/${vals[1]}`;
  }
  return "https://www.facebook.com/";
}

function getTwitterURL(id_str, screen_name) {
  return `https://twitter.com/${screen_name}/status/${id_str}`;
}

module.exports = {
  parseTwitterDate,
  parseFacebookDate,
  reduceTextLength,
  getFacebookPostURL,
  replaceHTMLEntity,
  getTwitterURL
};
