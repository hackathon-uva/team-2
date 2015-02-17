'use strict';

//Setting up route
angular.module('goal-flow').config([
	'$stateProvider',
	function($stateProvider) {
		$stateProvider
			.state('commit', {
				url: '/commit',
				templateUrl: 'modules/goal-flow/views/goals.client.view.html',
				controller: 'GoalsCommitController'
			})
			.state('rate', {
				url: '/rate',
				templateUrl: 'modules/goal-flow/views/rate.client.view.html',
				controller: 'GoalRateController'
			})
			.state('visualise', {
				url: '/progress',
				template: '<div layout="column"><md-card flex><spider-graph id="foo"></spider-graph></md-card></div>'
			});
	}
]);
