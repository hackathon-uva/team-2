'use strict';

angular.module('goal-flow').controller('GoalsStreamController', [
	'$scope',
	'goalsSocket',
	function($scope, goalsSocket) {
		$scope.goals = [];
		$scope.keyword = undefined;


		console.log('hoi');

	}
]);
