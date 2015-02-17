'use strict';

//Setting up route
angular.module('twitter-stream').config([
	'$stateProvider',
	function($stateProvider) {
		// Twitter stream state routing
		$stateProvider.
		state('goals', {
			url: '',
			templateUrl: 'modules/twitter-stream/views/goals.client.view.html',
			controller: 'GoalsStreamController'
		});
	}
]);
