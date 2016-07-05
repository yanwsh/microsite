'use strict';
var feedsSetting = {
  EnableFacebook: true,
  facebook: {
    app_id: "1076676405689986",
    app_secret: "6be486778d20ef87784eb4f53f1f008e",
    graph_version: "v2.4",
    number_per_request: 10,
    screen_name: "marinecorps"
  },
  EnableTwitter: true,
  twitter: {
    consumerKey: 'yH0rv0XhBfk0XSGlXTsIdbSGO',
    consumerSecret: 'RiEt5OsLYAUdqZbjhmB0SyVGDmI7QUGto46FhuBmppGv0itjNp',
    accessToken: '141275034-VYmeaIoIKp98l08drJwR90EyePB5oUHa9UjJvegI',
    accessTokenSecret: '462EHbfLTIcMgNRgNaUdcSVzqWv60Ow04r0ipfXElS5Vt',
    callBackUrl: '	http://partner.complex.com/usmc/api/twitter/response',
    user_id: '16129106',
    number_per_request: 10
  },
  EnableBrandContent: true,
  BrandContentLink: "http://www.complex.com/feeds/generator/e/n/us-army.json"
};

module.exports = feedsSetting;
