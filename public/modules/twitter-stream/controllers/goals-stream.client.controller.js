'use strict';

angular.module('goal-flow').controller('GoalsStreamController', [
	'$scope',
	'goalsSocket',
	function($scope, goalsSocket) {
		$scope.goals = ['ik wil komende jaar nooit doelen formuleren','ik wil meanJS beter begrijpen','ik wil nu antwoord op vraag des levens'];
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
