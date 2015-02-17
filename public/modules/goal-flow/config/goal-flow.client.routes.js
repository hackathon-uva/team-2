'use strict';

//Setting up route
angular.module('goal-flow').config([
	'$stateProvider',
	function($stateProvider) {
		// Twitter stream state routing
		$stateProvider.
		state('rate', {
			url: '/rate',
			templateUrl: 'modules/goal-flow/views/rate.client.view.html',
			controller: 'GoalRateController'
		}).
		state('commit', {
			url: '/commit',
			templateUrl: 'modules/goal-flow/views/goals.client.view.html',
			controller: 'GoalsCommitController'
		});
	}
]);
