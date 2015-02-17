'use strict';

angular.module('goal-flow').controller('GoalRateController', [
	'$scope',
	'Mygoals',
	function($scope, Mygoals) {
		$scope.mygoals = Mygoals;
		$scope.keyword = undefined;

	}


]);
