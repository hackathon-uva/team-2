'use strict';

angular.module('twitter-stream').service('goalsSocket', [
	'socketFactory',
	function(socketFactory) {
		return socketFactory();
	}
]);
