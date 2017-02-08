/**
 * IFFE which has MainController
 * @author https://github.com/sirMerr
 */
(function () {
	// declare module
	const angular = require('angular');
	const app = angular.module('GitView', []);

	const MainController = function ($scope, $http, $interval, $log) {
		let countdownInterval = null;

		const decrementCountdown = function () {
			$log.info('Countdown to automatic search: ' + $scope.countdown);
			$scope.countdown--;
			if ($scope.countdown < 1) {
				$scope.search('sirMerr');
			}
		};

		const startCountdown = function () {
			countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
		};
		// gets repo data
		const onRepos = function (res) {
			$scope.repos = res.data;
		};

		// displays error when something goes wrong
		const onError = function (reason) {
			$scope.error = 'Could not fetch the data';
		};

		// gets user data
		const onUserComplete = function (res) {
			$scope.user = res.data;
			$http.get($scope.user.repos_url)
        .then(onRepos, onError);
		};

		/**
		 * GET request for user, runs @function {onUserComplete}
		 * and sets {$scope.repoSortOrder} as descending stars count.
		 * @param  {String} username -- username given
		 */
		$scope.search = function (username) {
			$log.info('Searching for ' + username);
			$http.get('https://api.github.com/users/' + username)
				.then(onUserComplete, onError);
			if (countdownInterval) $interval.cancel(countdownInterval);
		};

		$scope.message = 'GitView';
		$scope.countdown = 5;
		$scope.repoSortOrder = '-stargazers_count';
		startCountdown();
	};

	// declare controller with MainController and an array containing all
	// necessary variables
	app.controller('MainController', MainController);
})();
