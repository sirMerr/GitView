/* global angular:true */
/**
 * IFFE which has MainController
 * @author https://github.com/sirMerr
 */
(function () {
	// declare module
	const app = angular.module('GitView', []);
	const MainController = function ($scope, $http) {
		$scope.message = 'GitView';
		$scope.username = 'angular';

		const onRepos = function (res) {
			$scope.repos = res.data;
		};
		const onError = function (reason) {
			$scope.error = 'Could not fetch the data';
		};

		const onUserComplete = function (res) {
			$scope.user = res.data;
			$http.get($scope.user.repos_url)
        .then(onRepos, onError);
		};

		$scope.search = function (username) {
			$http.get('https://api.github.com/users/' + username)
        .then(onUserComplete, onError);
			$scope.repoSortOrder = '-stargazers_count';
		};
	};

	app.controller('MainController', ['$scope', '$http', MainController]);
})();
