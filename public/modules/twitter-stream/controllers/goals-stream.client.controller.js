'use strict';

angular.module('twitter-stream').controller('GoalsStreamController', [
	'$scope',
	'goalsSocket',
	function($scope, goalsSocket) {
		$scope.goals = [];
		$scope.keyword = undefined;

		$scope.updateStream = function () {
			$scope.goals = [];

			goalsSocket.emit('query', $scope.keyword);
		};

		goalsSocket.on('goal', function (goal) {
			$scope.goals.unshift(goal);
		});
	}
]);
