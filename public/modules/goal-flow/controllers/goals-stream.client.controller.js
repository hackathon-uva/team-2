'use strict';

angular.module('goal-flow').controller('GoalsCommitController', [
	'$scope',
	function($scope) {
		$scope.goals = [{name:'ik wil nu stoppen'},{name:'ik wil heel goed zijn'},{name:'ik wil NU broodjes'}];
		$scope.mygoals = [];
		$scope.keyword = undefined;

		$scope.commit = function(index) {
			var goal = $scope.goals.splice(index,1)[0]
			$scope.mygoals.push(goal);

		}	

		$scope.remove = function(index) {
			var goal = $scope.mygoals.splice(index,1)[0]
			$scope.goals.push(goal);
		}

	}


]);
