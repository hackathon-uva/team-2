'use strict';

/**
 * Module dependencies.
 */
var twitter = require('twit')({
  consumer_key: 'BJyJCbJX7vGswmktRhoa3DTp4',
  consumer_secret: 'vpCv9s2ZkVGCfGnUB3QPRWGr61Zb8mjX9TQZ2o3F651U4rbgRV',
  access_token: '14725963-iEaCxoubJSuaCuqKZWx64oh78R2eCngbIYdWNpmF4',
  access_secret: 'uRa6tGhSyZDRgmYXvhtUWZmw63O0tfSt1TYof93OFAiHT'
});

module.exports = function (keyword) {
  return twitter.stream('statuses/filter', {track: keyword});
};
