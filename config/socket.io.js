'use strict';

var Twit = require('twit');
var twitter = new Twit({
  consumer_key: 'BJyJCbJX7vGswmktRhoa3DTp4',
  consumer_secret: 'vpCv9s2ZkVGCfGnUB3QPRWGr61Zb8mjX9TQZ2o3F651U4rbgRV',
  access_token: '14725963-iEaCxoubJSuaCuqKZWx64oh78R2eCngbIYdWNpmF4',
  access_token_secret: 'uRa6tGhSyZDRgmYXvhtUWZmw63O0tfSt1TYof93OFAiHT'
});
var socket = require('socket.io');
var searches = {};

module.exports = function(server) {
  var io = socket(server);

  io.on('connection', function (socket) {
    searches[socket.id] = {};
    socket.on('query', function (query) {
      var search = twitter.stream('statuses/filter', {track: query});

      console.log('Search added:', query);

      search.on('tweet', function(tweet) {
        socket.emit('goal', tweet);
      });

      search.on('limit', function(limitMessage) {
        console.log('Limit for socket ' + socket.id + ' on query ' + query + ' reached!');
      });

      search.on('warning', function(warning) {
        console.log('warning', warning);
      });

      // https://dev.twitter.com/streaming/overview/connecting
      search.on('reconnect', function(request, response, connectInterval) {
        console.log('reconnect :: connectInterval', connectInterval);
      });

      search.on('disconnect', function(disconnectMessage) {
        console.log('disconnect', disconnectMessage);
      });

      searches[socket.id][query] = search;
    });

    socket.on('remove', function(query) {
      searches[socket.id][query].stop();
      delete searches[socket.id][query];

      console.log('Search removed:', query);
    });

    socket.on('disconnect', function() {
      var k;

      for (k in searches[socket.id]) {
        searches[socket.id][k].stop();
        delete searches[socket.id][k];
      }

      delete searches[socket.id];

      console.log('Disconnect from user:', socket.id);
    });

    socket.on('error', function (error) {
      console.log('Socket error:', error);
    });
  });
};
