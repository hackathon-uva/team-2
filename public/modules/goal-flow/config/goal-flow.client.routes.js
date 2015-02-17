'use strict';

//Setting up route
angular.module('goal-flow').config([
	'$stateProvider',
	function($stateProvider) {
		// Twitter stream state routing
		$stateProvider.
		state('commit', {
			url: '/commit',
			templateUrl: 'modules/goal-flow/views/goals.client.view.html',
			controller: 'GoalsCommitController'
		});
	}
]);
