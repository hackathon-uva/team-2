'use strict';

var Stream = require('../lib/twitter-stream');
var socket = require('socket');
var sockets = {};

module.exports = function(app) {
  var io = socket(app);

  io.on('connection', function (socket) {
    sockets[socket.id] = {};
    socket.on('query', function (query) {
      var stream = Stream(query);

      console.log('Search added:', query);

      stream.on('tweet', function(tweet) {
        socket.emit('goal', tweet);
      });

      stream.on('limit', function(limitMessage) {
        console.log('Limit for socket ' + socket.id + ' on query ' + q + ' reached!');
      });

      stream.on('warning', function(warning) {
        console.log('warning', warning);
      });

      // https://dev.twitter.com/streaming/overview/connecting
      stream.on('reconnect', function(request, response, connectInterval) {
        console.log('reconnect :: connectInterval', connectInterval)
      });

      stream.on('disconnect', function(disconnectMessage) {
        console.log('disconnect', disconnectMessage);
      });

      sockets[socket.id][query] = stream;
    });

    socket.on('remove', function(query) {
      sockets[socket.id][query].stop();
      delete sockets[socket.id][query];

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
  });
};
