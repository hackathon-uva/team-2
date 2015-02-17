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
      //var search = twitter.stream('statuses/filter', {track: query});
      //
      //console.log('Search added:', query);
      //
      //search.on('tweet', function(tweet) {
      //  console.log('Tweet received', tweet);
      //
      //  if (tweet.text.substr(0,2) === 'RT') return;
      //
      //  socket.emit('goal', tweet);
      //});
      //
      //search.on('limit', function(limitMessage) {
      //  console.log('Limit for socket ' + socket.id + ' on query ' + query + ' reached!');
      //});
      //
      //search.on('warning', function(warning) {
      //  console.log('warning', warning);
      //});
      //
      //// https://dev.twitter.com/streaming/overview/connecting
      //search.on('reconnect', function(request, response, connectInterval) {
      //  console.log('reconnect :: connectInterval', connectInterval);
      //
      //  socket.emit('api_error', {type: 'limit', interval: connectInterval});
      //});
      //
      //search.on('disconnect', function(disconnectMessage) {
      //  console.log('disconnect', disconnectMessage);
      //});

      twitter.get('search/tweets', {q: query}, function (err, data, response) {
        if (!data) return console.log('No data received', response);

        var tweets = data.statuses || [];

        searches[socket.id][query] = setInterval(emitGoal, 5000);

        function emitGoal () {
          socket.emit('goal', tweets.shift());
        }
      });
    });

    socket.on('remove', function(query) {
      clearQuery(query);
      console.log('Search removed:', query);
    });

    socket.on('disconnect', function() {
      Object.keys(searches[socket.id]).forEach(clearQuery);

      delete searches[socket.id];

      console.log('Disconnect from user:', socket.id);
    });

    function clearQuery(query) {
      //searches[socket.id][query].stop();
      clearInterval(searches[socket.id][query]);
      delete searches[socket.id][query];
    }

    socket.on('error', function (error) {
      console.log('Socket error:', error);
    });
  });
};
