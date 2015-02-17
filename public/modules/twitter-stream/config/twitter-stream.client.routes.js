'use strict';

//Setting up route
angular.module('twitter-stream').config([
	'$stateProvider',
	function($stateProvider) {
		// Twitter stream state routing
		$stateProvider
			.state('stream', {
				abstract: true,
				templateUrl: 'modules/twitter-stream/views/goals.client.view.html'
			})
			.state('stream.start', {
				url: '^',
				templateUrl: 'modules/twitter-stream/views/goals-form.client.view.html',
				controller: ['$scope', '$state', function ($scope, $state) {
					$scope.keyword = undefined;
					$scope.submit = function () {
						if (!$scope.keyword) return;

						$state.go('stream.list', {keyword: $scope.keyword});
					};
				}]
			})
			.state('stream.list', {
				params: {
					keyword: {value: undefined, squash: true}
				},
				templateUrl: 'modules/twitter-stream/views/goals-list.client.view.html',
				controller: ['$scope', '$stateParams', 'goalsSocket', function ($scope, $stateParams, goalsSocket) {
					$scope.goals = [];

					goalsSocket.emit('query', $stateParams.keyword);

					goalsSocket.on('goal', function (goal) {
						$scope.goals.unshift(goal);
					});
				}]
			});
	}
]);
