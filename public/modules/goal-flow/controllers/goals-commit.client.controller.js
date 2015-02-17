'use strict';

angular.module('goal-flow').controller('GoalsCommitController', [
	'$scope',
	'$state',
	'Mygoals',
	function($scope, $state, Mygoals) {
		$scope.goals = [{name:'ik wil nu stoppen'},{name:'ik wil heel goed zijn'},{name:'ik wil NU broodjes'}];
		$scope.mygoals = Mygoals;
		$scope.keyword = undefined;
		//$scope.error = '';

		$scope.commit = function(index) {
			var goal = $scope.goals.splice(index,1)[0]
			$scope.mygoals.push(goal);

		}	

		$scope.remove = function(index) {
			var goal = $scope.mygoals.splice(index,1)[0]
			$scope.goals.push(goal);
		}

		$scope.proceed = function() {
			if (!$scope.mygoals.length) return $scope.error = 'please select at least one goal'

			$state.go('rate');
		}

	}

]);
