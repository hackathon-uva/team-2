'use strict';

angular.module('goal-flow').controller('GoalsStreamController', [
	'$scope',
	'goalsSocket',
	function($scope, goalsSocket) {
		$scope.goals = [];
		$scope.active = false;
		$scope.keyword = undefined;

		$scope.updateStream = function () {
			if (!$scope.keyword) return;

			$scope.goals = [];
			$scope.active = true;
			$scope.error = undefined;

			goalsSocket.emit('query', $scope.keyword);
		};

		goalsSocket.on('goal', function (goal) {
			$scope.goals.unshift(goal);
		});

		goalsSocket.on('api_error', function (error) {
			$scope.active = false;
			$scope.error = error;
		});
	}
]);
